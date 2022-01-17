import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import GroupList from "./groupList";
import SearchPanel from "./searchPanel";
import api from "../api";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchValue, setSearchValue] = useState("");

    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const pageSize = 8;

    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

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
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    useEffect(() => {
        setSearchValue("");
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const usersOnProfFilter = () => {
            return users.filter((user) => {
                return (
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
                );
            });
        };
        const filtredUsers = selectedProf
            ? usersOnProfFilter(users)
            : searchValue
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(searchValue.toLowerCase())
              )
            : users;

        const count = filtredUsers.length;

        const sortedUsers = _.orderBy(
            filtredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const handleSearchUsers = (e) => {
            setSearchValue(e.target.value);
            setSelectedProf();
        };

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
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
                    <SearchPanel
                        handleSearchUsers={handleSearchUsers}
                        clearFilter={clearFilter}
                        value={searchValue}
                    />
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
