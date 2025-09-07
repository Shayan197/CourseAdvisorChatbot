import React, { useContext, useState } from "react";
import { assets } from "../Assets/assets";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import useVoiceRecorder from "../hooks/useVoiceRecorder";
import "../App.css";

const Main = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);
  const { startRecording, stopRecording, recording, timer } =
    useVoiceRecorder();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleFAQClick = (question) => {
    setInput(question);
    onSent(question);
  };

  return (
    <div className="flex-1 min-h-screen pb-24 relative">
      <div className="flex justify-between items-center text-2xl p-5 text-customGray/90">
        <p>Chatbot</p>
        <div className="flex gap-4">
          <img
            src={assets.profile_icon}
            alt=""
            className="w-10 cursor-pointer"
            onClick={() => setDropdown((prev) => !prev)}
          />
          {dropdown && (
            <div className="absolute right-7 top-10 bg-[#f0f4f9] text-base px-4 py-1">
              <p
                className="hover:bg-[#dfe4ea] cursor-pointer"
                onClick={() => navigate("allcourses")}
              >
                Courses Details
              </p>
              <p
                className="hover:bg-[#dfe4ea] cursor-pointer text-red-400"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="main-cont max-w-4xl m-auto">
        {!showResult ? (
          <>
            <div className="greet mx-0 my-12 text-5xl text-[#b2b6b3] font-medium">
              <p className="text-customGray/70 mb-2">Hello, Students.</p>
              <p>How can I assist you today?</p>
            </div>

            <div className="cards grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5">
              <div
                className="card_design"
                onClick={() => handleFAQClick("Tell me about my cgpa.")}
              >
                <p>Tell me about my cgpa.</p>
                <img
                  src={assets.compass_icon}
                  alt=""
                  className="card_img_design"
                />
              </div>
              <div
                className="card_design"
                onClick={() => handleFAQClick("Tell me about my fail cources.")}
              >
                <p>Tell me about my fail cources.</p>
                <img
                  src={assets.bulb_icon}
                  alt=""
                  className="card_img_design"
                />
              </div>
              <div
                className="card_design"
                onClick={() => handleFAQClick("What is Next JS?")}
              >
                <p>What is Next JS?</p>
                <img
                  src={assets.message_icon}
                  alt=""
                  className="card_img_design"
                />
              </div>
              <div
                className="card_design"
                onClick={() =>
                  handleFAQClick("Am I going to drop this semester?")
                }
              >
                <p>Am I going to drop this semester?</p>
                <img
                  src={assets.code_icon}
                  alt=""
                  className="card_img_design"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="result px-[5%] py-0 max-h-[70vh] overflow-y-scroll">
            <div className="result-title my-10 mx-0 flex items-center gap-5">
              <img
                className="w-10 rounded-full"
                src={assets.profile_icon}
                alt="user_icon"
              />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data flex items-start gap-5">
              <img
                className="w-10"
                src={assets.gemini_icon}
                alt="gemini_icon"
              />
              {loading ? (
                <div className="ani w-full flex flex-col gap-3">
                  <hr className="hrDesign" />
                  <hr className="hrDesign" />
                  <hr className="hrDesign" />
                </div>
              ) : (
                <p
                  className="font-normal text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="main-botom absolute bottom-0 w-full max-w-4xl py-0 px-5 m-auto">
          <div className="searchBox flex items-center justify-between bg-[#f0f4f9] px-5 py-2 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              className="flex-1 bg-transparent border-none outline-none p-2 text-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSent();
                }
              }}
            />
            <div className="flex gap-2 items-center">
              <div>
                {recording ? (
                  <div className="relative">
                    <img
                      src={assets.mic_icon}
                      alt="mic_icon"
                      className="cursor-pointer size-6 animate-pulse bg-red-500 rounded-full p-1"
                      onMouseUp={async () => {
                        setIsProcessing(true);
                        try {
                          const response = await stopRecording();
                          if (response && response.voice_answer_file) {
                            try {
                              const responsePath =
                                response.voice_answer_file.replace(/\\/g, "/");
                              const audio = new Audio(
                                `http://localhost:5000/${responsePath}`
                              );
                              await audio.play();
                            } catch (error) {
                              if (error.message.includes("400")) {
                                alert(
                                  "Voice file is missing or invalid. Please record again."
                                );
                              } else {
                                alert("Something went wrong: " + error.message);
                              }
                            }
                          }
                        } catch (error) {
                          alert("Voice processing failed: " + error.message);
                        } finally {
                          setIsProcessing(false);
                        }
                      }}
                    />
                    <span className="absolute -top-5 left-0 text-xs text-red-500 font-bold">{`${timer}s`}</span>
                  </div>
                ) : isProcessing ? (
                  <div className="loader border-t-2 border-blue-500 w-6 h-6 rounded-full animate-spin"></div>
                ) : (
                  <img
                    src={assets.mic_icon}
                    alt="mic_icon"
                    className="cursor-pointer size-6"
                    onMouseDown={startRecording}
                  />
                )}
              </div>
              <img
                onClick={() => {
                  if (recording || isProcessing) return;
                  if (!input.trim()) {
                    alert("First type prompt in input field");
                    return;
                  }
                  onSent();
                }}
                src={assets.send_msg_icon}
                alt="send_icon"
                className={`size-7 transition-opacity ${
                  !input.trim() || recording || isProcessing
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              />
            </div>
          </div>
          <p className="text-xs my-3 mx-auto text-center font-normal text-customGray/60">
            Chatbot may apply inaccurate info, including about academia so
            double check its responses. Your question trained it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
