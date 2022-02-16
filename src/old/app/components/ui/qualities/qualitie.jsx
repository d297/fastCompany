import React from "react";
import PropsTypes from "prop-types";

const Qualitie = ({ color, name, _id }) => {
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
};

Qualitie.propTypes = {
    color: PropsTypes.string.isRequired,
    name: PropsTypes.string.isRequired,
    _id: PropsTypes.string.isRequired
};

export default Qualitie;
