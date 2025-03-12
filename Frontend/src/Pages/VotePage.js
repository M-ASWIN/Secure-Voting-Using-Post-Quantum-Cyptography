import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/VotePage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";

const VotePage = () => {
    const { electionId } = useParams();
    const [election, setElection] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [isVoting, setIsVoting] = useState(false); // Track voting state

    
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    useEffect(() => {
        fetchElection();
    }, []);

    // const encryptData = (data, sharedSecret) => {
    //     const key = CryptoJS.enc.Utf8.parse(sharedSecret.substring(0, 32)); // Ensure key is 256-bit
    //     const iv = CryptoJS.enc.Utf8.parse(sharedSecret.substring(0, 16)); // IV should be 128-bit
    //     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    //         iv: iv,
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.NoPadding
    //     });
    //     return encrypted.toString();
    // };

    const encryptData = (data, sharedSecret) => {
        const key = CryptoJS.enc.Utf8.parse(sharedSecret.substring(0, 32)); // 256-bit key
    
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
            mode: CryptoJS.mode.ECB,  // Change to ECB
            padding: CryptoJS.pad.Pkcs7
        });
    
        console.log("Encrypted Data (Base64):", encrypted.toString());
        return encrypted.toString();
    };
    
    const decryptData = (encryptedData, sharedSecret) => {
        const key = CryptoJS.enc.Utf8.parse(sharedSecret.substring(0, 32)); // 256-bit key
    
        const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
            mode: CryptoJS.mode.ECB,  // Use ECB mode
            padding: CryptoJS.pad.Pkcs7
        });
    
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        console.log("Decrypted Data:", decryptedText);
        
        return JSON.parse(decryptedText); // Convert back to object
    };

    const fromHex = (hex) => new Uint8Array(
        hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
    );
    
    

    // const decryptData = (encryptedData, sharedSecret) => {
    //     const key = CryptoJS.enc.Utf8.parse(sharedSecret.substring(0, 32)); // Ensure key is 256-bit
    //     const iv = CryptoJS.enc.Utf8.parse(sharedSecret.substring(0, 16)); // IV should be 128-bit
    
    //     const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    //         iv: iv,
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.Pkcs7
    //     });
    
    //     return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)); // Convert back to JSON
    // };

    function base64ToUint8Array(base64String) {
        let binaryString = atob(base64String);
        let uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
        return uint8Array;
    }

    const fetchElection = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/elections/${electionId}`);
            setElection(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching election details:", error);
            setLoading(false);
        }
    };
    
    const handleVote = async (candidateId) => {

        if (isVoting) return; // Prevent multiple clicks
        setIsVoting(true); 
        try {
            const sharedSecret = localStorage.getItem("sharedSecret");
            if (!sharedSecret) {
                toast.error("Shared secret missing!", { position: "top-right" });
                setIsVoting(false); // Re-enable button
                return;
            }
        
            const data = { userId, electionId, candidateId };
            const encryptedData = encryptData(data, sharedSecret);
            const decryptedData= decryptData(encryptedData,sharedSecret);
            console.log(data);
            console.log("decrypted data:", decryptedData);

            const toastId = toast.loading("Processing your vote...", { position: "top-right" });

            await axios.post(`http://localhost:8080/api/user-elections/vote`, {
                encryptedPayload: encryptedData,
                email: user.email
            });

            toast.update(toastId, {
                render: "You have been verified using ML-DSA and your vote is securely encrypted using ML-KEM !",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            // Redirect back to the dashboard after voting
            setTimeout(() => {
                navigate("/current-elections");
                setIsVoting(false); // Reset button state after navigation
            }, 3000);

        } catch (error) {
            console.error("Error submitting vote:", error);
            toast.error("Failed to submit vote. Try again!", { position: "top-right" });
            setIsVoting(false); // Re-enable button
        }
    };

    if (loading) {
        return <div className="vote-container">Loading...</div>;
    }

    return (
        <div className="vote-containers">
            <h1>{election?.name} Election</h1>
            <h2>Select a candidate to vote:</h2>
            <div className="candidates-list">
                {election?.candidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-card">
                        <h3><p>Candidate Name:</p>{candidate.name}</h3>
                        <h3><p>Party:</p></h3>
                        <h4>{candidate.party}</h4>
                        <button className="vote-button" onClick={() => handleVote(candidate.id)}>Vote</button>
                    </div>
                ))}
            </div>
            <ToastContainer /> 
        </div>
    );
};

export default VotePage;
