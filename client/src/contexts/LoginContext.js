import React, { useState, createContext} from 'react'

export const LoginContext = createContext()

export const LoginProvider = (props) => {
    const [user, setUser] = useState( {} )
    return (    
        <LoginContext.Provider value={[user, setUser]}>
            {props.children}
        </LoginContext.Provider>
    )
}