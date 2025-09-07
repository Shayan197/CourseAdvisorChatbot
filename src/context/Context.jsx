import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 50 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData(""); // clear previous response
  };

  const onSent = async (prompt) => {
    setResultData(""); // clear screen before new text
    setLoading(true);
    setShowResult(true);

    try {
      let response;
      let questionToAsk;

      if (prompt !== undefined) {
        response = await main(prompt);
        setPrevPrompt((prev) => [...prev, prompt]);
        questionToAsk = prompt;
      } else {
        response = await main(input);
        questionToAsk = input;
        setPrevPrompt((prev) => [...prev, input]);
      }

      setRecentPrompt(questionToAsk);

      // Response format karna
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("</br>");
      let newResponseArray = newResponse2.split(" ");

      // ab sirf typewriter effect se likhega
      newResponseArray.forEach((word, i) => {
        delayPara(i, word + " ");
      });
    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData("<i>Error fetching response. Please try again later.</i>");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
