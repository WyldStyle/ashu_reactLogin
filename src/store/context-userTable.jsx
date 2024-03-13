import { createContext } from "react";
export const UserTableContext = createContext({
  userInfo :{},
  setUserInfo:()=>{},
  userTable: [],
setUserTable:()=>{},
setRepaint:()=>{},
editMode:false,
setEditMode:()=>{}
});