import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PopUpLogin from './PopUpLogin'
const Nav = () => {
  const navigate = useNavigate()
    const [popup,setPopup]=useState(false) 
    const myStorage = window.localStorage;
    const userIsConnect = myStorage.getItem("user")
    const handleLogout = () => {
      navigate('/')
      window.location.reload(false)
      myStorage.removeItem("user");
    };

  return (
    <>

    <nav className=" py-5 mb-12 flex justify-between items-center bg-white  sticky top-0 z-10 w-12/12">
       <Link to='/'><h1 className="font-medium text-xl ml-3"> Tom  <span className='text-red-600'>online coding web</span></h1></Link>     
          {!userIsConnect?
            <button
            onClick={()=>{setPopup(!popup)}}
                className="  text-white px-4 py-2 border-none rounded-md mr-8"
              >
                  sign in/up
              </button>
          :
           <div className=" h-[5vh]  w-[10vw]  mr-3 flex items-center justify-between">
           <h1 onClick={handleLogout} className="font-medium text-xl ml-3 text-red-600 cursor-pointer"> LogOut</h1>
             
            </div>
            }
          </nav>
          {popup && <PopUpLogin popup={popup} setPopup={setPopup}/>}
    </>
  )
}

export default Nav
