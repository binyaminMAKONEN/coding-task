import React, { useRef, useState } from "react";
import axios from "axios";

function PopUpLogin({ setPopup, popup }) {
  const [signIn, setSignIn] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const myStorage = window.localStorage;
  //Variables that hold the value of the inputs
  const usernameRef = useRef();
  const positionRef = useRef();
  const passwordRef = useRef();
  const userLogRef = useRef();
  const passwordLogRef = useRef();

  const signUp = async () => {
    const newUser = {
      username: usernameRef.current.value,
      position: positionRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("http://localhost:8080/api/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  const logIn = async () => {
    const user = {
      username: userLogRef.current.value,
      password: passwordLogRef.current.value,
    };
    try {
      const res = await axios.post("http://localhost:8080/api/login", user);
      myStorage.setItem("user", JSON.stringify(res.data))
      window.location.reload(false)
      setPopup(!popup);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <div className=" fixed inset-0  z-50 shadow h-screen  backdrop-blur-sm bg-black/30 flex justify-center items-center  ">
        <div className=" border-2 w-full md:w-[40vw]  h-full md:h-[40vh] p-5 bg-white  ">
          <button
            className=" text-white px-4 py-2 border-none rounded-md mr-8 shadow-none"
            onClick={() => setPopup(!popup)}
          >
            x
          </button>
          {/* If the registration process went well it will display a positive response */}
          {success && (
            <span className="text-green-600">
              Successfull. You can login now!
            </span>
          )}
          {/* If the registration or login process did not proceed properly, it will display a negative response */}
          {error && <span className="text-red-600">Something went wrong!</span>}
          <div className="flex">
            <div className=" h-[30vh] flex flex-col gap-4 justify-center w-[50%]">
              {signIn ? (
                <>
                {/* sign up form */}
                  <input placeholder="username" ref={usernameRef} />
                  <input
                    list="position"
                    placeholder="position"
                    ref={positionRef}
                  />
                  <datalist id="position">
                    <option value="Student" />
                    <option value="Mentor" />
                  </datalist>
                  <input
                    type="password"
                    min="6"
                    placeholder="password"
                    ref={passwordRef}
                  />
                  <button
                    onClick={signUp}
                    className=" text-white px-4 py-2 border-none rounded-md mr-8"
                  >
                    SignUp{" "}
                  </button>
                  <span>
                    or{" "}
                    <button
                      className="bg-none  shadow-none text-red-700"
                      onClick={() => setSignIn(!signIn)}
                    >
                      SignIn
                    </button>
                  </span>
                </>
              ) : (
                <>
                {/* sign in form */}
                  <input placeholder="username" ref={userLogRef} />
                  <input
                    type="password"
                    min="6"
                    placeholder="password"
                    ref={passwordLogRef}
                  />
                  <button
                    onClick={logIn}
                    className=" text-white px-4 py-2 border-none rounded-md mr-8"
                  >
                    SignIn{" "}
                  </button>
                  <span>
                    or{" "}
                    <button
                      className="bg-none  shadow-none text-red-700"
                      onClick={() => setSignIn(!signIn)}
                    >
                      SignUp
                    </button>
                  </span>
                </>
              )}
            </div>
            <div className=" h-[30vh] w-[50%] flex justify-center">
              <img src="/codingLogo.png" alt="logo" height={45} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUpLogin;
