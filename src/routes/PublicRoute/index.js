// Core

import { Route, Switch } from "react-router-dom";
import SignInPage from "../../_UI/components/Pages/SignInPage";
import SignUpPage from "../../_UI/components/Pages/SignUpPage";
import CreateAccountPage from "../../_UI/components/Pages/CreateAccountPage";
import AddNewUserContainer from "../../_UI/components/Pages/ActivateCompany/CreateNewUser/AddNewUserContainer";
import AddBankAccountContainer from "../../_UI/components/Pages/ActivateCompany/AddBankAccount/AddBankAccountContainer";


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
            <Route path="/create/bank">
                <AddBankAccountContainer/>
            </Route>
        </Switch>
    )
};

export default PublicRoute