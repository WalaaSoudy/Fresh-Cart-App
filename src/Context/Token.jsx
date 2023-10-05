import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';

export let TokenContext =createContext()
export default function TokenContextProvider(props){
  
    let [UserToken,setUserToken]=useState(null)
    
    return <TokenContext.Provider value={{UserToken  , setUserToken}}>
        {props.children}
    </TokenContext.Provider>
}