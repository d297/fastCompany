import React from "react";
// import Users from "../components/users";
import UserPage from "../components/common/page/userPage";
import UsersListPage from "../components/common/page/usersListPage";
import PropTypes from "prop-types";

const UsersList = ({ match, history }) => {
    const userId = match.params.userId;

    return (
        <>
            {userId ? (
                <UserPage userId={userId} history={history} />
            ) : (
                <UsersListPage />
            )}
        </>
    );
};
UsersList.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default UsersList;
