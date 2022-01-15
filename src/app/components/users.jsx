import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import GroupList from "./groupList";
import api from "../api";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;

    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    console.log(users);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
        console.log(id);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        console.log("page: ", pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        console.log("selectedProf = ", selectedProf);
        const filtredUsers = selectedProf
            ? users.filter((user) => {
                  return (
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
                  );
              })
            : users;

        const count = filtredUsers.length;

        console.log("filtredUsers.length", filtredUsers.length);

        const sortedUsers = _.orderBy(
            filtredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        console.log("usersCrop =", usersCrop);

        const clearFilter = (params) => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemsSelect={handleProfessionSelect}
                            valueProperty="_id"
                            contentProperty="name"
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UserTable
                            onSort={handleSort}
                            users={usersCrop}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
