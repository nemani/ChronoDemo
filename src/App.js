import React, { Component } from "react";
import chrono from "chrono-node";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// (Make material-ui happy)
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import SearchBox from "./SearchBox";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val:
                "The event start at 9AM on monday and will end at midnight on friday."
        };
    }
    parsed(str) {
        this.setState({
            val: str
        });
    }

    render() {
        //https://css-tricks.com/quick-css-trick-how-to-center-an-object-exactly-in-the-center/
        const style = {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        };
        let lol = "Enter text to tryout compromise";
        let results = chrono.parset(his.state.val);
        if (results[0]) {
            console.log(results);
            lol = JSON.stringify(results, null, 2);
        }
        return (
            <MuiThemeProvider>
                <div>
                    <div style={style}>
                        <SearchBox
                            query={this.state.val}
                            onQueryUpdate={this.parsed.bind(this)}
                        />
                        <br />
                        <span style={{ fontWeight: "bold" }}>
                            Compromise Date-Words Detection Demo
                        </span>
                    </div>
                    <br />
                    <br />
                    <span>
                        <pre>{lol}</pre>
                    </span>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
