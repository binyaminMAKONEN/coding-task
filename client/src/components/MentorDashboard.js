import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
const MentorDashboard = ({ codeBlock }) => {
  const navigate = useNavigate();
  const [newCode, setNewCode] = useState("//write your code here");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const titleRef = useRef();
  const exerciseRef = useRef();
  const solution = useRef();

  const editorRef = useRef(null);
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
// create new codeBlock
  const addCodeBlock = async () => {
    const newCodeBlock = {
      title: titleRef.current.value,
      code: newCode,
      exercise:exerciseRef.current.value,
      solution:solution.current.value
    };

    try {
      await axios.post("http://localhost:8080/api/code", newCodeBlock);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
//Delete code block
  const deleteCodeBlock = async () => {
    await axios.delete(`http://localhost:8080/api/code/${codeBlock._id}`);
    navigate("/");
  };
  return (
    <>
      {/*take the val from the input and editor and upload/POST new codeBlock */}
      <div className=" flex flex-col gap-4 justify-center w-[30%] mb-3">
        <label>
          Title : <input placeholder="title" ref={titleRef} />
        </label>
        <label>
          solution : <input placeholder="solution" ref={solution}/>
        </label>

        <textarea
        ref={exerciseRef}
          className="w-[35vw] h-[15vh]"
          placeholder="write her what need to do "
        />
      </div>

      <Editor
        height="50vh"
        width="80vw"
        theme="vs-dark"
        defaultLanguage="javascript"
        value={newCode}
        options={{ wordWrap: "on" }}
        onMount={handleEditorDidMount}
        onChange={(e) => setNewCode(e)}
      />
      <button
        className="  px-4 py-2 border-none rounded-md mr-8"
        onClick={() => addCodeBlock()}
      >
        upload new codeBlock
      </button>
      {success && (
        <span className="text-green-600">
          Successfull. You can gp to the Lobby page now!
        </span>
      )}
      {error && <span className="text-red-600">Something went wrong!</span>}

      {/* {/* Delete the current codeBlock */}
      <h1 className="font-medium text-2xl ml-3 mt-16">
        {" "}
        Be careful this <span className="text-red-600">Danger Zone</span>
      </h1>
      <div className="  border-2 border-red-700 w-[80vw] h-[20vh] flex justify-between items-center">
        <h1 className="font-medium text-2xl ml-3 ">
          {" "}
          Are you sure you want to delete{" "}
          <span className="text-red-600">{codeBlock.title}</span> codeBlock
        </h1>

        <button
          className="  px-4 py-2 border-none rounded-md mr-8"
          onClick={() => deleteCodeBlock()}
        >
          delete
        </button>
      </div>
    </>
  );
};

export default MentorDashboard;
