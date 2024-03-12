import { useContext, useState } from "react"
import axios from "axios"
import { UserTableContext } from "../store/context-userTable"

export default function UserDetail() {
  const { setRepaint } = useContext(UserTableContext)
  let { userInfo, setUserInfo, editMode, setEditMode } = useContext(UserTableContext);

  const handleOnChange = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [e.target.id]: e.target.value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log('userInfo that we send', { ...userInfo });
      // axios.post("http://localhost:3001/newExpEntry",userInfo)
      // const response = await fetch("http://localhost:3001/exp/newExpEntry",{
      //   method:"POST",
      //   headers:{
      //     "Content-Type":"application/json",
      //   },
      //   body:JSON.stringify(userInfo)
      // })
      let response;
      let url = 'http://localhost:3001/exp/';
      if (!editMode.mode) response = await axios.post(`${url}newExpEntry`, { ...userInfo })
      else {
        await axios.put(`${url}updateExpEntry/${editMode.id}`, { ...userInfo })
          .then(() => {
            setEditMode({
              mode: false,
              id: ''
            })
          })
      }
      setUserInfo(() => {
        return {
          username: "",
          password: ""
        }
      })
      setRepaint((prevVal) => !prevVal)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className="form-control" action="" onSubmit={handleSubmit}>
      <input
       className="form-control form-control-lg"
        type="text" placeholder="UserName"
        aria-label=".form-control-lg example"
        value={userInfo.username}
        id="username"
        onChange={handleOnChange}
        required
      ></input>

      <input type="password"
        id="inputPassword5"
        className="form-control form-control-lg"
        placeholder="Password"
        aria-describedby="passwordHelpBlock"
        value={userInfo.password}
        onChange={handleOnChange}
      ></input>
      <div id="passwordHelpBlock" className="form-text">
        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
      </div>
      <button type="submit">{editMode.mode ? "Update" : "Register"}</button>
    </form>
  )
}