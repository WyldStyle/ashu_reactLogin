import axios from "axios";

import { useContext, useEffect } from "react";
import TableCell from "./TableCell"
import { UserTableContext } from "../store/context-userTable";

function getFields(obj) {
  const keys = Object.keys(obj);
  const res = []
  for (let key of keys) {
    if (key != '_id' && obj[key]) {
      res.push(obj[key])
    }
  }
  return res;
}

export default function TableRow({ singleUser }) {

  // const contextObj = useContext(UserTableContext);
  // const userTable = contextObj.userTable;
  // const setUserTable = contextObj.setUserTable;
  // let isDeleted = contextObj.isDeleted;
  let {editMe,deleteMe, isDeleted} = useContext(UserTableContext)

  singleUser = getFields(singleUser);
  return (
    <tr>
      {
        singleUser.map((eachDetails) => (
          <TableCell eachDetails={eachDetails}></TableCell>
        ))
      }
      <td>
        <button className="button" onClick={editMe}>Edit</button>
        <button className="button" onClick={deleteMe}>Delete</button>
      </td>
    </tr>
  )
}