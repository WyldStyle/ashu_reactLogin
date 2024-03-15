import { useContext, useState } from "react"
import axios from "axios"
import { UserTableContext } from "../store/context-userTable"

let [lower, upper, number, special] = [false, false, false, false];
export default function UserDetail() {
  const { setRepaint } = useContext(UserTableContext)
  let { userInfo, setUserInfo, editMode, setEditMode } = useContext(UserTableContext);
  const [isValid, setIsValid] = useState(false);
  const [isPassTyped, setIsPassTyped] = useState(false)
  // let [[lower, upper, number, special], setPassField] = useState[[false, false, false, false]];
  // won't work value changes after every render
  // console.log('initial', lower, upper, number, special);

  const handleOnChange = (e) => {
    if (e.target.value != null) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [e.target.id]: e.target.value
      })
      )
      if (!isPassTyped) {
        const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(e.target.value);
        setIsValid(() => isValidPassword)
      }
    }
    console.log([e.target.id]);
  }
  const handleKeyDown = (e) => {

    setIsPassTyped((prev) => true)
    // console.log('handlingKEydown',e.key);
    console.log(userInfo);
    const str = `!@#$%^&*()-_=+[]{}|;:',.<>?"`
    if (lower && upper && number && special) {
      [lower, upper, number, special] = [false, false, false, false]
      return true;

    } if (e.key >= 'a' && e.key <= 'z') lower = true;
    else if (e.key >= 'A' && e.key <= 'Z') upper = true
    else if (e.key >= '0' && e.key <= '9') number = true
    else if (str.includes(e.key)) special = true
    if (lower && upper && number && special) {
      setIsValid((prev) => !prev);
    }
    // console.log(lower, upper, number, special);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("isValid", isValid);
    if(!userInfo.college.trim) { return window.alert('Enter your college')}
    if (userInfo.username.trim && isValid) {
      try {
        let response;
        let url = 'http://localhost:3001/exp/';
        if (!editMode.mode) {
          response = await axios.post(`${url}newExpEntry`, { ...userInfo })
          window.alert(`Welcome aboard ${userInfo.username}!!!`)
        }
        else {
          await axios.put(`${url}updateExpEntry/${editMode.id}`, { ...userInfo })
            .then(() => {
              setEditMode({
                mode: false,
                id: ''
              }
              )
              window.alert(`${userInfo.username}, you're Edited`)
            }
            )
        }
        setUserInfo(() => {
          return {
            username: "",
            password: "",
            college:""
          }
        })
        setRepaint((prevVal) => !prevVal)
      } catch (error) {
        console.log(error);
      }
    }
    else {
      // window.alert('Enter Valid pass')
      window.alert(isValid,'wrong Password')
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
      <br />

      <input type="text"
        id="password"
        className="form-control form-control-lg"
        placeholder="Password"
        aria-describedby="passwordHelpBlock"
        value={userInfo.password}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      ></input>
      <br />
      <input type="text" name="" 
      id="college"
      className="form-control form-control-lg"
      placeholder="College Name"
      value={userInfo.college}
      onChange={handleOnChange}
       />
      <div id="passwordHelpBlock" className="form-text">
        Your password must be atleast 4 characters long, contain letters, UpperCase, LowerCase, number and special characters and must not contain spaces.
      </div>
      <button type="submit">{editMode.mode ? "Update" : "Register"}</button>
    </form>
  )
}
