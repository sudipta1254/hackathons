import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import M from "materialize-css"
import { handleEnter } from '../../utils/handleEnter'
import "materialize-css/dist/css/materialize.min.css"
import { GoogleGenerativeAI } from "@google/generative-ai";
import MarkDown from "react-markdown"
import spark from "../../assets/spark.svg"
import $ from "jquery"
import "../../index.css"

const genai = new GoogleGenerativeAI(process.env.REACT_APP_GENAI_KEY);

const Chatbot = ({user, setUser}) => {
   document.title = "personaAI - AI"
   const navigate = useNavigate()
   
   const [input, setInput] = useState("")
   const [data, setData] = useState("")
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const [history, setHistory] = useState([])

   useEffect(() => {
      navigate(!user?.logged && "/")
   }, [user])
   useEffect(() => {
      M.AutoInit();
   }, [])
   useEffect(() => {
      const convo = $(".Chatbot-btn")
      convo.text(loading ? "cached" : "send")
      if (convo.text() === "cached")
         convo.addClass("chatbot-btn-rotate")
      return () => convo.removeClass("chatbot-btn-rotate")
   }, [loading])

   const handleSetHistory = (role, txt) => {
      setHistory(prevHistory => [
         ...prevHistory, { role, parts: [{text: txt}] }
      ]);
   }
   
   const generateContent = async() => {
      if (!input) {
         alert("Enter prompt to continue..")
         return
      }
      setLoading(true)
      try {
         const model = genai.getGenerativeModel({ model: "gemini-1.5-flash"});
         const chat = model.startChat({
            history,
            generationConfig: {
            //   maxOutputTokens: 100,
            },
         });
      
         const txt = input
         setInput("")
         handleSetHistory("user", txt)
         const result = await chat.sendMessage(txt);
         const response = result.response;
         const text = response.text();
         // console.log(text);
         setData(text)
         handleSetHistory("model", text)
         setError(null)
         setLoading(false)
      } catch (err) {
         console.log(err)
         setData(null)
         setError(err)
         setLoading(false)
      }
   }

   return (
      <div className="Chatbot container">
         <div className="message-text">
            { error }
         </div>
         <div className="data-container">
            { (!data) && <div className="dummyText">
               <img src={spark} alt="spark" style={{width:"4rem"}} />
               <div className="dummy-options">
                  <h5>Start with a prompt</h5>
               </div>
            </div> }
            <div className="conversation">
               {history.map(({role, parts}, index) => (
                  <div
                     key={index}
                     className={`message ${role === 'user' ? 'user-message' : 'ai-message'}`}
                  >
                     <MarkDown>{parts[0].text}</MarkDown>
                  </div>
               ))}
            </div>
         </div>
         <div className="input-container">
            <i className="material-icons">attach_file</i>
            <input id="Chatbot-input" type="text" placeholder="Enter prompt.."
               value={input}
               onKeyDown={e => handleEnter(e, ".Chatbot-btn") }
               onChange={e => setInput(e.target.value) }
            />
            <i className="material-icons Chatbot-btn" type="button"
               onClick={ generateContent }
            >send</i>
         </div>
      </div>
   );
}
 
export default Chatbot;