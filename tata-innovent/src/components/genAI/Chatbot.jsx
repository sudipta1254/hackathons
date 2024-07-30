import React, { useEffect, useState } from 'react'
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
      $(".Chatbot-btn").text(loading ? "cached" : "send")
      .toggleClass("chatbot-btn-rotate")
   }, [loading])
   useEffect(() => {
      setHistory([...history, {
         role: "user",
         parts: [{ text: input }],
      }, {
         role: "model",
         parts: [{ text: data }],
      }])
   }, [data])
   
   const generateContent = async() => {
      if (!input) {
         alert("Enter prompt to continue..")
         return
      }
      setLoading(true)
      try {
         const model = genai.getGenerativeModel({ model: "gemini-1.5-flash"});
         const chat = model.startChat({
            history: history,
            generationConfig: {
            //   maxOutputTokens: 100,
            },
         });
      
         const result = await chat.sendMessage(input);
         const response = result.response;
         const text = response.text();
         console.log(text);
         setData(text)
         setError(null)
         setLoading(false)
         setInput("")
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
            { !data && <div className="dummyText">
               <img src={spark} alt="spark" style={{width:"4rem"}} />
               <div className="dummy-options">
                  <div className="option-1 option">
                     <i className="material-icons">add</i>
                     <p>Option 1</p>
                  </div>
                  <div className="option-2 option">
                     <i className="material-icons">add</i>
                     <p>Option 2</p>
                  </div>
               </div>
            </div> }
            <MarkDown>{ data }</MarkDown>
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