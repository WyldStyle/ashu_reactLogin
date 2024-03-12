import { createContext } from "react";
// export const UserTableContext = createContext({});
// it won't give auto complete suggestion

// it'll give autocomplete suggestion
export const UserTableContext = createContext({

userTable: [],
addNewUser: ()=>{},
editMe: ()=>{},
deleteMe: ()=>{},
isDeleted: false
});