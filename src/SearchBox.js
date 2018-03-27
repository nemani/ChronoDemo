import React from "react";

import { TextField } from "material-ui";

const baseStyles = {
    open: {
        width: "50vw"
    },
    frame: {
        padding: 3,
        border: "solid 1px black",
        borderRadius: 5
    }
};

const SearchBox = ({ query, onQueryUpdate, additionalStyles, frameClass }) => {
    let textStyle = baseStyles.open;
    const divStyle = Object.assign(
        {},
        textStyle,
        baseStyles.frame,
        additionalStyles ? additionalStyles.frame : {}
    );

    return (
        <div style={divStyle} className={frameClass ? frameClass : ""}>
            <TextField
                id="future_input"
                name="future_input"
                style={textStyle}
                value={query}
                onChange={(event, value) => onQueryUpdate(value)}
            />
        </div>
    );
};

export default SearchBox;
