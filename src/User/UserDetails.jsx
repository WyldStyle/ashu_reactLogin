import { useState } from "react"
import axios  from "axios"

export default function UserDetail(){
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ''
  })
  const handleOnChange = (e)=>{
    setUserInfo((prevUserInfo) =>({
      ...prevUserInfo,
      [e.target.id]: e.target.value
    }))
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
    console.log('userInfo that we send',{...userInfo});
    // axios.post("http://localhost:3001/newExpEntry",userInfo)
    // const response = await fetch("http://localhost:3001/exp/newExpEntry",{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json",
    //   },
    //   body:JSON.stringify(userInfo)
    // })
    const response = await axios.post("http://localhost:3001/exp/newExpEntry",{...userInfo})
    console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return(
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username"onChange={handleOnChange}required />
      <label htmlFor="password">Password</label>
      <input type="text" id="password" onChange={handleOnChange} />
      <button type="submit">Register</button>
    </form>
  )
}