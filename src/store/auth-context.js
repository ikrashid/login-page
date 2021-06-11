import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    // for iintellisense 
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider =(props) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        // app is reloaded, react goes thru entire component
        // anon function is run because page reloaded so dependencies are considered to have changed 
        // then, state changes and app is rerendered. react goes thru entire code, updating dom if need be, then asses useEffect. dependencies havent changed, so anon function isnt rerun
        const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInfo === '1'){
          setIsLoggedIn(true);
        }
      }, [])
    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };
    
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
    <AuthContext.Provider
        value = {{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}
    >
        {props.children}
    </AuthContext.Provider>)
}
export default AuthContext;