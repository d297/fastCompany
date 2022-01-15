import React, { useState, useEffect } from "react";
import api from "../api";
import PropTypes from "prop-types";

const User = ({ userId, history }) => {
    const handleExit = () => {
        history.replace("/users");
    };

    function getCode({
        _id,
        name,
        profession,
        qualities,
        completedMeetings,
        rate
    }) {
        return (
            <div>
                <h2>{name}</h2>
                <h2>{"Профессия: " + profession.name}</h2>
                <div>
                    {qualities.map((quality) => (
                        <span
                            key={quality._id}
                            className={`m-1 badge bg-${quality.color}`}
                        >
                            {quality.name}
                        </span>
                    ))}
                    <br />
                    <span>{"Количество встреч :" + completedMeetings}</span>
                    <br />
                    <span>{"Рейтинг: " + rate}</span>
                </div>

                <button onClick={() => handleExit()}>Все пользователи</button>
            </div>
        );
    }
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    return <>{user ? <>{getCode(user)}</> : "Loading"}</>;
};
User.propTypes = {
    userId: PropTypes.string.isRequired,
    history: PropTypes.object
};

export default User;
