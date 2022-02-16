import React from "react";
import PropTypes from "prop-types";

const SearchPanel = ({ handleSearchUsers, value, clearFilter }) => {
    return (
        <input
            type="text"
            id="searchName"
            name="searchName"
            onChange={handleSearchUsers}
            onClick={clearFilter}
            value={value}
            placeholder="Search..."
        />
    );
};
SearchPanel.propTypes = {
    handleSearchUsers: PropTypes.func,
    value: PropTypes.string.isRequired,
    clearFilter: PropTypes.func
};
export default SearchPanel;
