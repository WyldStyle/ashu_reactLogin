import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import './App.css'
import UserDetail from './User/UserDetails'
import TableList from './Table/TableList'
import { UserTableContext } from './store/context-userTable'

//pure_method
  const userTableReducer = (currentuserTable, action)=>{
    let newUserTable = currentuserTable;
    if(action.type === 'NEW_USER'){
      newUserTable = [
        ...currentuserTable,
        {username: action.payload.username, password: action.payload.password}
      ]
    }
    else if(action.type ==="DELETE_USER"){

    }
    else return newUserTable;
  }


export default function App() {
  // const userTable = getTable();
  // const [userTable, setUserTable] = useState([]);
  const [userTable, dispatchUserTable] = useReducer(userTableReducer,[]);
  // dispatch(action) = useReducer(reducerFn, initialValue, init?)
  let isDeleted = false;

  useEffect(() => {
    axios.get('http://localhost:3001/exp/findAll')
      .then((response) => {
        if (response.data.data) {
          // setUserTable(response.data.data)
          dispatchUserTable(response.data.data);
        }
      })
  }, [isDeleted])

const addNewUser = (username, password) =>{
  const newUserAction = {
    type: "NEW_USER",
    payload:{
      username,
      password
    }
  }
  dispatchUserTable(newUserAction);
}
const editMe = ()=>{}
const deleteMe = ()=>{}



  return (
      <UserTableContext.Provider value = {{
        // userTable: userTable,
        // setUserTable: setUserTable,
        // isDeleted: isDeleted
        userTable,
        addNewUser,
        editMe,
        deleteMe,
        isDeleted
        }}>
        <UserDetail></UserDetail>
        <TableList 
        ></TableList>
      </UserTableContext.Provider>
  )
}