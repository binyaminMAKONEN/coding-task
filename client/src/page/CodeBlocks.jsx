import React, { useState, useRef,useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import MentorDashboard from "../components/MentorDashboard";
import StudentDashboard from "../components/StudentDashboard";
import io from "socket.io-client"
const socket = io.connect("http://localhost:3002")


const CodeBlocks = () => {
  const { id } = useParams();
  
  const myStorage = window.localStorage;
  const codes = JSON.parse(myStorage.getItem("codes"));
  const codeBlock = codes.find((code) => code._id === id);
  const codeSolution = codes.map((code) => code.solution);
  
  const userPosition =JSON.parse(myStorage.getItem("user"))
//the value of the editor
  const [value,setValue]=useState(codeBlock.code)
  
   const sendMsg =(e)=>{
  socket.emit("send_code_real_time",e)
   }

  let readOnly;
 if(userPosition.position === "Student"){
    readOnly=false
  }else if(userPosition.position === "Mentor"){
    readOnly=true
  }
  
  const editorRef = useRef(null);
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  
  useEffect(() => {
    socket.on("receive_code",(data)=>{
      setValue(data)
      
    })
  },[]);
  return (
    <div className="relative w-full flex flex-col items-center py-10 ">
      <h1 className="mb-5">{codeBlock.title}</h1>

      <Editor
        height="50vh"
        width="50vw"
        theme="vs-dark"
        defaultLanguage="javascript"
        value={value}
        options={{ readOnly: readOnly, wordWrap: "on"}}
        onMount={handleEditorDidMount}
        onChange={(e)=>sendMsg(e)}
      />

   {userPosition.position ==="Mentor" ? 
    <div className="mt-20">
    <h1 className="font-medium text-2xl ml-3"> Hi, <span className='text-red-600'>{ userPosition.username}</span>  Let's Build New codeBlock for you'r Student </h1>
      <MentorDashboard codeBlock={codeBlock}/>
    </div> 
    : 
    <div className="mt-20">
    <h1 className="font-medium text-2xl ml-3"> Hi, <span className='text-red-600'>{ userPosition.username}</span>  {codeBlock.exercise} </h1>
      <StudentDashboard codeSolution={codeSolution} codeBlock={codeBlock}/>
    </div> }
    </div>
  );
};

export default CodeBlocks;
