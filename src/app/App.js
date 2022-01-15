import React from "react";
import NavBar from "./components/navbar";
import Main from "./layouts/main";
import UsersList from "./layouts/users";
import Login from "./layouts/login";

import { Switch, Route } from "react-router-dom";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/users/:userId?" component={UsersList} />
                <Route path="/login" component={Login} />
            </Switch>
        </>
    );
}

export default App;
