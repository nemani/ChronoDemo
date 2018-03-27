import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { SelectField, MenuItem } from "material-ui";

// (Make material-ui happy)
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import SearchBox from "./SearchBox";
import { makeTranslateUp } from "./move-up-animations";

const TranslateUp = makeTranslateUp(SearchBox);

class App extends Component {
    render() {
        //https://css-tricks.com/quick-css-trick-how-to-center-an-object-exactly-in-the-center/
        const style = {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        };

        return (
            <MuiThemeProvider>
                <div style={style}>
                    <TranslateUp />
                    <br />
                    Click the Search icon to animate.
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
