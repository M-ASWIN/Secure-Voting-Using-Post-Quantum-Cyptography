package com.example.Secure_voting.Controllers;


import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Repository.UserRepository;
import com.example.Secure_voting.Service.UserService;


import lombok.Data;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.security.Security;
import java.security.Signature;
import java.security.SignatureException;
import java.util.Base64;
import java.util.Map;

import jakarta.servlet.http.Cookie;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.bouncycastle.crypto.SecretWithEncapsulation;
import org.bouncycastle.jcajce.spec.MLDSAParameterSpec;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMGenerator;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMParameters;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPublicKeyParameters;
import org.bouncycastle.pqc.jcajce.provider.BouncyCastlePQCProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Data
public class AuthController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/validate-user")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> request) {
        String aadharNumber = request.get("aadharNumber");

        try {
            String result = userService.registerUser(aadharNumber);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/register-user")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        System.out.println(user);
        if (userService.isAadhaarNumberExists(user.getAadharNumber())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Aadhaar number is already in use.");
        }
        userRepository.save(user);
        System.out.println("success");
        String result="valid";
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> loginUser(@RequestBody Map<String, String> loginRequest, HttpSession session, HttpServletResponse response) throws SignatureException, NoSuchAlgorithmException, NoSuchProviderException, InvalidAlgorithmParameterException, InvalidKeyException {
       
        Security.addProvider(new BouncyCastleProvider());
        Security.addProvider(new BouncyCastlePQCProvider()); 

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        //ML-KEM
        String pkAlice = loginRequest.get("publicKeyBase64");
        byte[] publicKeyBytes = Base64.getDecoder().decode(pkAlice);
        System.out.println("pkalice length:" + publicKeyBytes.length);
        MLKEMPublicKeyParameters pubkeyParamkem = new MLKEMPublicKeyParameters((MLKEMParameters.ml_kem_512), publicKeyBytes);
        MLKEMGenerator mlkemGenerator = new MLKEMGenerator(new SecureRandom());
        SecretWithEncapsulation encaps = mlkemGenerator.generateEncapsulated(pubkeyParamkem);
        byte[] sharedSecret = encaps.getSecret();
        byte[] cipherText =encaps.getEncapsulation();

        //ML-DSA
        KeyPairGenerator kpGen = KeyPairGenerator.getInstance("MLDSA", "BC");
        kpGen.initialize(MLDSAParameterSpec.ml_dsa_44);
        KeyPair kp = kpGen.generateKeyPair();
        Signature mlDsa = Signature.getInstance("MLDSA");      

        User user = userService.findByEmail(email);
        user.setSharedSecret(sharedSecret);
        user.setMlkemPublicKey(publicKeyBytes);
        if (user != null && user.getPassword().equals(password)) {
            // Store user information in session
            Cookie sessionCookie = new Cookie("session_id", session.getId());
            sessionCookie.setHttpOnly(true);
            sessionCookie.setMaxAge(30 * 60);// 30 minutes session timeout
            sessionCookie.setSecure(false); 
            response.addCookie(sessionCookie);
            System.out.println(session.getAttribute("user"));
    
            mlDsa.initSign(kp.getPrivate());
            mlDsa.update(user.getEmail().getBytes());
            byte[] signature = mlDsa.sign();
            user.setMldsaPublicKey(kp.getPublic().getEncoded());
            user.setSignature(signature);
            userRepository.save(user);

            session.setAttribute("user", user);
            session.setAttribute("email", user.getEmail());

             // Create response with role
             Map<String, Object> responseMap = Map.of(
                "message", "Login successful",
                "role", user.getRole(),
                "user",user,
                "sessioncookie", session.getId().toString(),
                "cipherText", Base64.getEncoder().encodeToString(cipherText)
            );
            return ResponseEntity.ok(responseMap);
        } else {
            Map<String, Object> responseMap = Map.of(
                "message", "Invalid credentials"
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body( responseMap);
        }
    }

    @PutMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestParam Long userId) {
        userService.logoutUser(userId);
        return ResponseEntity.ok("User logged out successfully.");
    }
    
  
}
