import axios from "axios";

import { useContext, useEffect} from "react";
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

export default function TableRow({singleUser}) {

  // const contextObj = useContext(UserTableContext);
  // const userTable = contextObj.userTable;
  // const setUserTable = contextObj.setUserTable;
  // let isDeleted = contextObj.isDeleted;
  let {userTable, setUserTable, isDeleted} = useContext(UserTableContext);

  const singleUserX = getFields(singleUser);
  console.log("inTbleRowSingle", singleUserX);
  const deleteMe = async () => {
    await axios.delete(`http://localhost:3001/exp/delExpEntry/${singleUser._id}`)
      .then(() => {
        for (let i = 0; i < userTable.length; i++) {
          if (userTable[i]._id === singleUser._id) {
            setUserTable((prevUserTable) => {
              const updatedUserTable = prevUserTable.splice(i, 1)
              return updatedUserTable;
            })
          };
        }
        isDeleted = true;
      })
  }
  // const deleteMe = () => {
  //   useEffect(() => {
  //     axios.delete(`http://localhost:3001/exp/delExpEntry/${singleUser._id}`)
  //       .then(() => {
  //         setUserTable((prevUserTable) => {
  //           const updatedUserTable = prevUserTable.splice(i, 1)
  //           return updatedUserTable;
  //         })
  //       })
  //   }, [])
  // }
  return (
    // <div>{JSON.stringify(singleUser)}</div>
    <tr>
      {
        singleUserX.map((eachDetails) => (
          <TableCell eachDetails={eachDetails}></TableCell>
        ))
      }
      <td>
        <button className="button">Edit</button>
        <button className="button" onClick={deleteMe}>Delete</button>
      </td>
    </tr>
  )
}