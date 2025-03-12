package com.example.Secure_voting.Service;


import com.example.Secure_voting.Entity.Aadhaar;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Repository.AadhaarRepository;
import com.example.Secure_voting.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@Data
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AadhaarRepository aadhaarRepository;

    public String registerUser(String aadharNumber) {
        Optional<Aadhaar> existingAadhaar = aadhaarRepository.findByAadharNumber(aadharNumber);
        if (existingAadhaar.isPresent()) {
            return "valid";

        } else {
            throw new IllegalArgumentException("Aadhaar number not found in records");
        }
    }

    public boolean isAadhaarNumberExists(String aadhaarNumber) {
        return userRepository.existsByAadharNumber(aadhaarNumber);
    }
    

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public void logoutUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setSharedSecret(null);
            user.setMldsaPublicKey(null);
            user.setMlkemPublicKey(null);
            user.setSignature(null);
            userRepository.save(user);
        }
    }

    public PublicKey convertToPublicKey(byte[] encodedKey, String algorithm) throws Exception {
        KeyFactory keyFactory = KeyFactory.getInstance(algorithm); // Ensure "ML-DSA44" is supported
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(encodedKey);
        return keyFactory.generatePublic(keySpec);
    }

    public <T> T decryptData(String encryptedData, String sharedSecret, Class<T> valueType) throws Exception {
        // Ensure shared secret is exactly 32 bytes (AES-256)
        if (sharedSecret.length() < 32) {
            throw new IllegalArgumentException("Shared secret must be at least 32 characters for AES-256");
        }
    
        // Convert sharedSecret String to exactly 32 bytes (UTF-8)
        byte[] keyBytes = sharedSecret.substring(0, 32).getBytes(StandardCharsets.UTF_8);
        SecretKeySpec secretKeySpec = new SecretKeySpec(keyBytes, "AES");
    
        // Initialize AES cipher in ECB mode with PKCS5 padding
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
    
        // Decode Base64 input
        byte[] decodedBytes = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedBytes = cipher.doFinal(decodedBytes);
    
        // Convert decrypted bytes to string
        String decryptedJson = new String(decryptedBytes, StandardCharsets.UTF_8);
        System.out.println("Decrypted Data: " + decryptedJson);
    
        // Convert JSON string back to Java object
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(decryptedJson, valueType);
    } 
}
