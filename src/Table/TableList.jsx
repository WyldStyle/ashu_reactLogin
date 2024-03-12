import { UserTableContext } from "../store/context-userTable";
import TableRow from "./TableRow";
import { useContext } from "react";
export default function TableList() {
  // console.log("inTableList",userTable);
  const contextObj = useContext(UserTableContext);
  const userTable = contextObj.userTable
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
            <TableRow singleUser={singleUser} 
            ></TableRow>
          ))
        }
      </tbody>
    </table>
  )
}