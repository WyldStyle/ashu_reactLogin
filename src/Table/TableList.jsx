import TableRow from "./TableRow";
export default function TableList({ userTable,setUserTable,isDeleted }) {
  // console.log("inTableList",userTable);
  return (
    // <div>
    //   <div>
    //     <div>Username</div>
    //     <div>Password</div>
    //   </div>
    //   {/* <div>{JSON.stringify(userTable)}</div> */}
    //   <div>
    //     {userTable.map((singleUser) =>( 
    //       <TableRow singleUser={singleUser}></TableRow>
    //      ))}
    //   </div>
    // </div>
    <table className="table table-striped " data-bs-theme="dark">
      <thead>
        <th>Username</th>
        <th>password</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {
          userTable.map((singleUser) => (
            <TableRow singleUser={singleUser} userTable= {userTable}
            setUserTable = {setUserTable}
            isDeleted={isDeleted}></TableRow>
          ))
        }
      </tbody>
    </table>
  )
}