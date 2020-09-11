// Core
import React from "react";
import { Route, Switch } from "react-router-dom";
import SignInPage from "../../components/Pages/SignInPage";
import SignUpPage from "../../components/Pages/SignUpPage";
import CreateAccountPage from "../../components/Pages/CreateAccountPage";
import AddNewUserContainer from "../../components/Pages/CreateNewUser/AddNewUserContainer";


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
            <Route path="/create/user">
                <AddNewUserContainer/>
            </Route>
        </Switch>
    )
};

export default PublicRoute