import React from "react";
import { Link } from "react-router-dom";

const ListCard = ({ codeBlocks, userIsConnect }) => {
  return (
    <div className=" flex flex-wrap gap-8 justify-center items-center my-6 ">
      {userIsConnect ? (
        <>
          {codeBlocks.map((codeBlock, i) => (
            <Link key={i} to={`/CodeBlocks/${codeBlock._id}`}>
              <div className="w-[80vw] md:w-[40vw] bg-cyan-50 p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
                <h3>{codeBlock.title}</h3>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <>
          {codeBlocks.map((codeBlock, i) => (
            <div key={i} className="w-[80vw] md:w-[40vw] bg-cyan-50 p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <h3>{codeBlock.title}</h3>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListCard;
