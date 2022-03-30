import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";

import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingCard from "../../ui/meetingCard";
import Comments from "../../ui/comments";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data);
        });
    }, []);

    if (user) {
        return (
            <div>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard data={user.qualities} />
                            <MeetingCard value={user.completedMeetings} />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <h1>Loa1ding!</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
