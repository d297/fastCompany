import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import Edit from "../components/page/editData";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    console.log("params: ", params);
    return (
        <>
            {!userId ? (
                <UsersListPage />
            ) : edit ? (
                <Edit id={userId} />
            ) : (
                <UserPage id={userId} />
            )}
        </>
    );
};

export default Users;
