import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualitie from "../../ui/qualities/quality";

import { Link } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data);
        });
        console.log(user);
    }, []);
    setTimeout(() => {
        console.log(user);
    }, 5000);
    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                {user.qualities.map((quality) => (
                    <Qualitie key={quality._id} {...quality} />
                ))}
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <Link to={`/users/${user._id}/edit`}>
                    <button className="btn btn-primary">Изменить</button>
                </Link>
            </div>
        );
    }
    return <h1>Loa1ding!</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
