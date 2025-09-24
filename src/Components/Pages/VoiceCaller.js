import React, { useState } from "react";

const VoiceDialer = () => {
    const [phoneNumber, setPhoneNumber] = useState("9075372928");
    const [listening, setListening] = useState(false);

    // 🎤 Start speech recognition
    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setListening(true);

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            const detectedNumber = spokenText.replace(/\D/g, "");
            setPhoneNumber(detectedNumber);
            setListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Error:", event.error);
            alert("Speech error: " + event.error);
            setListening(false);
        };

        recognition.onend = () => setListening(false);

        recognition.start();
        
    };


    // 📞 Make phone call
    const makeCall = () => {
        if (!phoneNumber) {
            alert("No phone number detected");
            return;
        }

        // Open dialer on mobile
        window.location.href = `tel:+91${phoneNumber}`;
        console.log("Dialing number:", phoneNumber);
    };

    return (
        <section id="main-content">
            <section className="wrapper">
                <div className="container-fluid">
                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <h2>🎤 Voice Dialer</h2>

                        <p>Detected Number: <b>{phoneNumber || "None"}</b></p>

                        <button onClick={startListening} disabled={listening}>
                            {listening ? "Listening..." : "Speak Number"}
                        </button>

                        <br /><br />

                        <button onClick={makeCall} disabled={!phoneNumber}>
                            📞 Call {phoneNumber || ""}
                        </button>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default VoiceDialer;
