import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const multiSelectField = ({ options, onChange, name, label, value, error }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    const getInputClasses = () => {
        return "basic-multi-select" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label>{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={value}
                options={optionsArray}
                className={getInputClasses()}
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
multiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.array,
    error: PropTypes.string
};

export default multiSelectField;
