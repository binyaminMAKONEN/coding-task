import React, { useEffect, useState } from 'react'
import ListCard from '../components/ListCard';
import axios from 'axios';

const Lobby = () => {
    const [codeBlocks,setCodeBlocks] =useState([])
    const [error, setError] = useState(false);

    const myStorage = window.localStorage;
    const userIsConnect =JSON.parse(myStorage.getItem("user"))

    const getCodes = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/code");
          setCodeBlocks(res.data);
          myStorage.setItem("codes", JSON.stringify(res.data))
          setError(false)
        } catch (error) {
          setError(true)
        }
      };
useEffect(()=>{
    getCodes();
},[])
  return (
    <div className='w-full text-center  py-10 '>
    {userIsConnect &&<h1 className="font-medium text-xl ml-3"> Hi, <span className='text-red-600'>{ userIsConnect.username}</span> is nice to see you</h1>}
    <h1 className='py-4 text-gray-700 text-5xl   font-medium md:text-6xl'>Choose<span className='text-red-600'>code block </span> </h1>
    {/* codeBlock title */}
    <ListCard codeBlocks={codeBlocks} userIsConnect={userIsConnect}/>
    {error && <span className="text-red-600">Something went wrong!</span>}
    
    {userIsConnect &&
    <div className='flex  justify-center  mt-10'>
     <img src="/codingLogo.png" alt="logo"  />
    </div>
    }
    {userIsConnect === null &&
      <h1 className="font-medium text-xl ml-3"> Hi, <span className='text-red-600'>Dear Guest</span> you need to sign in to start</h1>
      }
    

</div>
  )
}

export default Lobby