import React, { useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";

function StudentDashboard({ codeSolution, codeBlock }) {
  const [smile, setSmile] = useState(false);
  const solutionRef = useRef();

  const checkSolution = () => {
    if (solutionRef.current.value === codeBlock.solution) {
      setSmile(true);
    } else {
      setSmile(false);
    }
  };

  return (
    <>
      <input
        ref={solutionRef}
        className="w-[25vw] ml-10 mr-3"
        list="position"
        placeholder="position"
      />

      <datalist id="position">
        {codeSolution.map((Solution, i) => (
          <option value={Solution} key={i} />
        ))}
      </datalist>
      <button
        onClick={() => checkSolution()}
        className="  px-4 py-2 border-none rounded-md mr-8"
      >
        Check solution
      </button>
      <div className="flex items-center justify-center  h-[20vh] mt-5">
        {smile && <BsEmojiSmile size={120} />}
      </div>
    </>
  );
}

export default StudentDashboard;
