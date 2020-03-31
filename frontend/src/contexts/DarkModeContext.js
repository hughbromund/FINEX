import React, {createContext, useReducer, useContext, useEffect} from 'react';

const DarkModeContext = createContext({isDarkMode: false});
const DarkModeToggleContext = createContext();
const localState = JSON.parse(localStorage.getItem("darkMode"));

const darkModeReducer = (state, action) => {
    console.log(action.type);
    switch (action.type) {
        case 'turnOnDarkMode': {
            return {isDarkMode: true}
        }
        case 'turnOffDarkMode': {
            return {isDarkMode: false}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const DarkModeProvider = ({children}) => {
    const [state, toggle] = useReducer(darkModeReducer, localState || {isDarkMode: false})

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(state));
      }, [state]);

    return (
        <DarkModeContext.Provider value={state}>
            <DarkModeToggleContext.Provider value={toggle}>
                {children}
            </DarkModeToggleContext.Provider>
        </DarkModeContext.Provider>
    )
}

const useDarkModeState = () => {
    const context = useContext(DarkModeContext)
    if (context === undefined) {
      throw new Error('useCountState must be used within a DarkModeProvider')
    }
    return context;
}

const useDarkModeToggle = () => {
const context = useContext(DarkModeToggleContext)
if (context === undefined) {
    throw new Error('useDarkModeToggle must be used within a DarkModeProvider')
}
return context;
}

export {DarkModeContext, DarkModeProvider, useDarkModeState, useDarkModeToggle};