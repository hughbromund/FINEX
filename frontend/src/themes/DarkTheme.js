import React from "react"

/**
 * This class represents a dark theme in react to be used elsewhere in the app.
 * It toggles the CSS styling using themes and context.
 * 
 * Code Snippets from:
 * https://medium.com/maxime-heckel/switching-off-the-lights-adding-dark-mode-to-your-react-app-with-context-and-hooks-f41da6e07269
 */

const white = "#FFFFFF"
const black = "#161617"

const lightTheme = {
    background: white,
    body: black
}

const darkTheme = {
    background: black,
    body: white
}

const theme = mode => (mode === "dark" ? darkTheme : lightTheme);

export default theme