import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import UserDetail from './User/UserDetails'
import TableList from './Table/TableList'
import { UserTableContext } from './store/context-userTable'
export default function App() {
  // const userTable = getTable();
  const [userTable, setUserTable] = useState([]);
  let isDeleted = false;
  useEffect(() => {
    axios.get('http://localhost:3001/exp/findAll')
      .then((response) => {
        if (response.data.data) {
          setUserTable(response.data.data)
        }
      })
  }, [isDeleted])

  return (
      <UserTableContext.Provider value = {{
        // userTable: userTable,
        // setUserTable: setUserTable,
        // isDeleted: isDeleted
        userTable,
        setUserTable,
        isDeleted
        }}>
        <UserDetail></UserDetail>
        <TableList 
          setUserTable={setUserTable}
          isDeleted={isDeleted}
        ></TableList>
      </UserTableContext.Provider>
  )
}