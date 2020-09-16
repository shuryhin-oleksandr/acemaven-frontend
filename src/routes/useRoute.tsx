import React from 'react'
import {Redirect, Route, Switch } from 'react-router-dom'
import AddBankAccountContainer from 'src/_UI/components/Pages/ActivateCompany/AddBankAccount/AddBankAccountContainer';
import AddNewUserContainer from 'src/_UI/components/Pages/ActivateCompany/CreateNewUser/AddNewUserContainer';
import CreateAccountPage from 'src/_UI/components/Pages/CreateAccountPage';
import SignInPage from "../_UI/components/Pages/SignInPage";
import SignUpPage from "../_UI/components/Pages/SignUpPage";



const useRoute = (isAuth: boolean) => {
    if (isAuth) {
        return (
            <Switch>
                <Redirect to='/'/>
            </Switch>

        )
    } else {
        return (
            <Switch>
                <Route component={SignInPage} path='/sign-in'/>
                <Route exact component={SignUpPage} path='/sign-up'/>
                <Route component={CreateAccountPage} path='/create-account'/>
                <Route component={AddNewUserContainer} path='/create/user'/>
                <Route component={AddBankAccountContainer} path='/create/bank'/>
            </Switch>
        )
    }
}

export default useRoute