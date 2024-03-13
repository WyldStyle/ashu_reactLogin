import axios from "axios";
import { UserTableContext } from "../store/context-userTable";
import TableRow from "./TableRow";
import { useContext } from "react";


export default function TableList() {
  // console.log("inTableList",userTable);
  // const contextObj = useContext(UserTableContext);
  // const userTable = contextObj.userTable
  // const setRepaint= contextObj.setRepaint
  const { userTable, setRepaint, setUserInfo,editMode,setEditMode} = useContext(UserTableContext)
  const editRow = (singleUser) => {
    setUserInfo(() => {
      return {
        username: singleUser.username,
          password: singleUser.password
      }
    })
    // console.log(userInfo);
    setEditMode(()=> ({
      mode: true,
      id: singleUser._id
    }))
    console.log(editMode);
  }
  const deleteRow = async (_id) => {
    await axios.delete(`http://localhost:3001/exp/delExpEntry/${_id}`)
      .then((response) => {
        // console.log('tableList response by mongodb',response.data);
        setRepaint((prev) => !prev)
      })
      .catch((error) => {
        console.log(error);
      })
    console.log(_id);
  }
  return (
    <table className="table table-striped " data-bs-theme="dark">
      <thead>
        <th>Username</th>
        <th>password</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {
          userTable.map((singleUser) => (
            <TableRow
              singleUser={singleUser}
              editRow={editRow}
              deleteRow={deleteRow}
            ></TableRow>
          ))
        }
      </tbody>
    </table>
  )
}