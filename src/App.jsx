import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Welcome from './store/welcome'
import UserDetail from './User/UserDetails'
import TableList from './Table/TableList'
import { UserTableContext } from './store/context-userTable'

export default function App() {
  // const userTable = getTable();
  const [userTable, setUserTable] = useState([]);
  const [repaint, setRepaint] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  })
  const [editMode, setEditMode] = useState({
    mode: false,
    id: ''
  });
  useEffect(() => {
    axios.get('http://localhost:3001/exp/findAll')
      .then((response) => {
        if (response.data.data) {
          setUserTable(response.data.data)
        }
      })
  }, [repaint])

  return (
    <>
      <Welcome></Welcome>
      <UserTableContext.Provider value={{
        // userTable: userTable,
        // setUserTable: setUserTable,
        // isDeleted: isDeleted
        userInfo,
        setUserInfo,
        userTable,
        setUserTable,
        setRepaint,
        editMode,
        setEditMode
      }}>
        <UserDetail ></UserDetail>
        <TableList
          setUserTable={setUserTable}
          setRepaint={setRepaint}
        ></TableList>
      </UserTableContext.Provider>
    </>
  )
}