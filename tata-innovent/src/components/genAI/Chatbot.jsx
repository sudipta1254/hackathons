import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import spark from "../../assets/spark.svg"
import M from "materialize-css"
import { handleEnter } from '../../utils/handleEnter'
import "materialize-css/dist/css/materialize.min.css"
import { GoogleGenerativeAI } from "@google/generative-ai";
import MarkDown from "react-markdown"
import $ from "jquery"
import "../../index.css"

const genai = new GoogleGenerativeAI(process.env.REACT_APP_GENAI_KEY);

const Chatbot = ({user, setUser}) => {
   document.title = "personaAI - AI"
   const navigate = useNavigate()
   
   const [input, setInput] = useState(null)
   const [data, setData] = useState(null)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)

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
   
   const generateContent = async() => {
      if (!input) {
         alert("Enter prompt to continue..")
         return
      }
      setLoading(true)
      try {
         const model = genai.getGenerativeModel({ model: "gemini-1.5-flash"});
         const result = await model.generateContent(input);
         const response = result.response;
         const text = response.text();
         console.log(text)
         setData(text)
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
            { !data && <div className="dummyText">
               <h4>This is a dummy text</h4>
            </div> }
            <MarkDown>{ data }</MarkDown>
         </div>
         <div className="input-container">
            <i className="material-icons">attach_file</i>
            <input id="Chatbot-input" type="text" placeholder="Enter prompt.."
               onKeyDown={e => handleEnter(e, ".Chatbot-btn") }
               onChange={e => setInput(e.target.value?.trim()) }
            />
            <i className="material-icons Chatbot-btn" type="button"
               onClick={ generateContent }
            >send</i>
         </div>
      </div>
   );
}
 
export default Chatbot;