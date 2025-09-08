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
    <div className="flex-1 flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex md:justify-between items-center text-lg md:text-2xl p-4 md:p-5 md:border-b text-customGray/90 border-gray-200">
        {" "}
        <p className="hidden sm:block font-semibold">Chatbot</p>
        <div className="flex gap-4 ml-auto">
          <img
            src={assets.profile_icon}
            alt=""
            className="w-9 md:w-10 cursor-pointer"
            onClick={() => setDropdown((prev) => !prev)}
          />
          {dropdown && (
            <div className="absolute right-10 top-24 md:right-4 md:top-14 bg-[#f0f4f9] text-sm md:text-base px-4 py-2 rounded-md shadow-md">
              <p
                className="hover:bg-[#dfe4ea] cursor-pointer px-2 py-1 rounded"
                onClick={() => navigate("allcourses")}
              >
                Courses Details
              </p>
              <p
                className="hover:bg-[#dfe4ea] cursor-pointer text-red-400 px-2 py-1 rounded"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full max-w-6xl mx-auto px-3 sm:px-4">
        {!showResult ? (
          <>
            {/* Greeting */}
            <div className="text-center my-8 sm:my-12">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-medium text-gray-500">
                Hello, Students.
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-gray-600 mt-2">
                How can I assist you today?
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 p-2">
              {[
                { text: "Tell me about my cgpa.", icon: assets.compass_icon },
                {
                  text: "Tell me about my fail courses.",
                  icon: assets.bulb_icon,
                },
                { text: "What is Next JS?", icon: assets.message_icon },
                {
                  text: "Am I going to drop this semester?",
                  icon: assets.code_icon,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="card_design flex flex-col justify-between p-3 sm:p-4 text-center hover:shadow-md transition"
                  onClick={() => handleFAQClick(card.text)}
                >
                  <p className="text-xs sm:text-sm md:text-base mb-2">
                    {card.text}
                  </p>
                  <img
                    src={card.icon}
                    alt="card_icon"
                    className="card_img_design w-8 sm:w-10 md:w-12 mx-auto"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          // Result Section
          <div className="result px-3 sm:px-4 py-6 max-h-[65vh] overflow-y-auto">
            <div className="result-title flex items-center gap-3 mb-6">
              <img
                className="w-8 sm:w-10 rounded-full"
                src={assets.profile_icon}
                alt="user_icon"
              />
              <p className="font-medium text-base sm:text-lg">{recentPrompt}</p>
            </div>
            <div className="flex gap-3 items-start">
              <img
                className="w-6 sm:w-8 flex-shrink-0"
                src={assets.gemini_icon}
                alt="gemini_icon"
              />
              <div className="flex-1">
                {loading ? (
                  <div className="flex flex-col gap-2 w-full">
                    <hr className="hrDesign" />
                    <hr className="hrDesign" />
                    <hr className="hrDesign" />
                  </div>
                ) : (
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  ></p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Input Box */}
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 py-2 px-3 sm:px-5">
        <div className="max-w-4xl mx-auto">
          <div className="searchBox flex items-center justify-between bg-[#f0f4f9] px-3 sm:px-5 py-2 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              className="flex-1 bg-transparent border-none outline-none px-2 text-sm sm:text-base md:text-lg"
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
          <p className="text-[10px] sm:text-xs mt-2 text-center text-customGray/60">
            Chatbot may give inaccurate info. Double check responses before use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
