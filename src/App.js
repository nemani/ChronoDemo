import React, { Component } from "react";

import chrono from "chrono-node";
import compromise from "compromise";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import SearchBox from "./SearchBox";

const data = {
    chrono: {
        align: "left",
        link: "https://github.com/wanasit/chrono",
        name: "Chrono"
    },

    compromise: {
        align: "right",
        link: "http://compromise.cool",
        name: "Compromise"
    }
};

class FrequencyResult extends Component {
    render() {
        const style = {
            border: "0px solid black",
            float: this.props.align
        };
        let list = [];
        let val = [];
        let el;
        if (this.props.name === "Chrono") {
            this.props.results.forEach(function(result) {
                let index = list.indexOf(result);
                if (index === -1) {
                    list.push(result.text);
                    val.push(1);
                } else {
                    val[index]++;
                }
            });
        } else {
            this.props.results
                .out("frequency")
                .reverse()
                .forEach(function(x) {
                    list.push(x.normal);
                    val.push(x.count);
                });
        }
        return (
            <span style={style}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <span style={{ fontWeight: "bold" }}>
                    Results from<a href={this.props.link}> {this.props.name}</a>:
                </span>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Value</th>
                            <th>Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((listItem, i) => (
                            <tr>
                                <td>{i}</td>
                                <td>{listItem}</td>
                                <td>{val[i]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </span>
        );
    }
}

class JsonResults extends Component {
    render() {
        const style = {
            margin: "5px",
            fontWeight: "bold",
            border: "2px solid red",
            float: this.props.align
        };
        return (
            <span style={style}>
                Raw Json Results from{" "}
                <a href={this.props.link}>{this.props.name}</a>{" "}
                <pre style={{ fontWeight: "normal" }}>
                    {JSON.stringify(this.props.results, null, 2)}
                </pre>
            </span>
        );
    }
}

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
        const style = {
            position: "fixed",
            top: "6%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        };

        let chronoOut = "";
        let resultsChrono = chrono.parse(this.state.val);
        if (resultsChrono) {
            chronoOut = resultsChrono;
        }

        let compromiseOut = "";
        let resultsCompromise = compromise(this.state.val).dates();
        if (resultsCompromise) {
            compromiseOut = resultsCompromise;
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
                        Date-Words Detection Demo
                    </div>
                    <br />
                    <br />
                    <JsonResults {...data.chrono} results={chronoOut} />
                    <JsonResults
                        {...data.compromise}
                        results={compromiseOut.data()}
                    />
                    <FrequencyResult
                        {...data.chrono}
                        results={chronoOut}
                        text={this.state.val}
                    />
                    <FrequencyResult
                        {...data.compromise}
                        results={compromiseOut}
                        text={this.state.val}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
