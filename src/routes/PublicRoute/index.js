// Core
import React from "react";
import { Route, Switch } from "react-router-dom";
import SignInPage from "../../components/Pages/SignInPage";
import SignUpPage from "../../components/Pages/SignUpPage";


const PublicRoute = () =>{
    return(
        <Switch>
            <Route path="/sign-in">
                <SignInPage/>
            </Route>
            <Route path="/sign-up">
                <SignUpPage/>
            </Route>
        </Switch>
    )
};

export default PublicRoute