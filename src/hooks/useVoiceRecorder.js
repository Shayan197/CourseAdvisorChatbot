import { useState, useRef } from "react";
import getVoiceResponse from '././GetVoiceResponse';

const regNo = localStorage.getItem('regNo');
const currentsemesterno = localStorage.getItem('currentsemesterno');

const useVoiceRecorder = () => {
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
            audioChunks.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunks.current.push(event.data);
            };

            mediaRecorderRef.current.onstart = () => {
                setRecording(true);
                setTimer(0);
                intervalRef.current = setInterval(() => {
                    setTimer(prev => prev + 1);
                }, 1000);
            };

            mediaRecorderRef.current.start();
        } catch (err) {
            console.error("Mic access error:", err);
        }
    };

    const stopRecording = () => {
        return new Promise((resolve, reject) => {
            if (!mediaRecorderRef.current) {
                reject("MediaRecorder is not initialized");
                return;
            }

            clearInterval(intervalRef.current);
            const duration = timer;
            setRecording(false);
            setTimer(0);

            mediaRecorderRef.current.onstop = async () => {
                if (duration < 1 || duration > 120) {
                    alert("Recording kam az kam 1 sec aur max 2 min ki honi chahiye");
                    return resolve(null);
                }

                const blob = new Blob(audioChunks.current, { type: "audio/webm" });
                if (blob.size === 0) {
                    alert("Empty voice recording. Please try again.");
                    return resolve(null);
                }
                const file = new File([blob], "voice_question.webm", { type: "audio/webm" });
                const formData = new FormData();
                formData.append("voice_question", file);
                formData.append("regNo", regNo);
                formData.append("currentsemesterno", currentsemesterno);
                // console.log("REG NO from localStorage:", regNo);
                // console.log("Audio blob size:", blob.size);


                try {
                    const response = await getVoiceResponse(formData);
                    // console.log("Backend Response is here", response)
                    resolve(response);
                } catch (error) {
                    if (error.message.includes("400")) {
                        alert("Voice file is missing or invalid. Please record again.");
                    } else {
                        alert("Something went wrong: " + error.message);
                    }
                    reject(error);
                }
            };

            mediaRecorderRef.current.stop();
        });
    };

    return { startRecording, stopRecording, recording, timer };
};

export default useVoiceRecorder;
