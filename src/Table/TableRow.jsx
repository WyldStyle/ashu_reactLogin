import TableCell from "./TableCell"

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

export default function TableRow({ singleUser, editRow, deleteRow }) {

  // const contextObj = useContext(UserTableContext);
  // const userTable = contextObj.userTable;
  // const setUserTable = contextObj.setUserTable;
  // let isDeleted = contextObj.isDeleted;


  let singleUserField = getFields(singleUser);
  return (
    <tr>
      {
        singleUserField.map((eachDetails) => (
          <TableCell eachDetails={eachDetails}></TableCell>
        ))
      }
      <td>
        <button className="button" onClick={() => editRow(singleUser)}>Edit</button>
        <button className="button" onClick={() => deleteRow(singleUser._id)}>Delete</button>
      </td>
    </tr>
  )
}