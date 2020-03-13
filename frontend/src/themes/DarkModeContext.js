import React, {createContext, useReducer, useContext} from 'react';

const DarkModeContext = createContext({isDarkMode: false});
const DarkModeToggleContext = createContext();

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
    const [state, toggle] = useReducer(darkModeReducer, {isDarkMode: false})
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
    return context
}

const useDarkModeToggle = () => {
const context = useContext(DarkModeToggleContext)
if (context === undefined) {
    throw new Error('useDarkModeToggle must be used within a DarkModeProvider')
}
return context
}

export {DarkModeProvider, useDarkModeState, useDarkModeToggle};