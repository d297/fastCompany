import React from "react";
import Users from "../components/users";
import User from "../components/user";
import PropTypes from "prop-types";

const UsersList = ({ match, history }) => {
    const userId = match.params.userId;

    return (
        <>{userId ? <User userId={userId} history={history} /> : <Users />}</>
    );
};
UsersList.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default UsersList;
