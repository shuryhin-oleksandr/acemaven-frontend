// Core
import React from "react";
import { Route, Switch } from "react-router-dom";
import SignInPage from "../../components/Pages/SignInPage";
import SignUpPage from "../../components/Pages/SignUpPage";
import CreateAccountPage from "../../components/Pages/CreateAccountPage";


const PublicRoute = () =>{
    return(
        <Switch>
            <Route path="/sign-in">
                <SignInPage/>
            </Route>
            <Route path="/sign-up">
                <SignUpPage/>
            </Route>
            <Route path="/create-account">
                <CreateAccountPage/>
            </Route>
        </Switch>
    )
};

export default PublicRoute