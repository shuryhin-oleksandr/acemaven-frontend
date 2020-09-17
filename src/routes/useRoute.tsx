import React from 'react'
import {Redirect, Route, Switch } from 'react-router-dom'
import AddBankAccountContainer from 'src/_UI/Pages/ActivateCompany/AddBankAccount/AddBankAccountContainer';
import AddNewUserContainer from 'src/_UI/Pages/ActivateCompany/CreateNewUser/AddNewUserContainer';
import CreateAccountPage from 'src/_UI/Pages/CreateAccountPage';
import SignInPage from "../_UI/Pages/SignInPage";
import SignUpPage from "../_UI/Pages/SignUpPage";
import AdditionalUserContainer from "../_UI/Pages/ActivateCompany/AdditionalUser/AdditionalUserContainer";
import ProfileContainer from "../_UI/Pages/Profile/ProfileConntainer";



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
                <Route component={AdditionalUserContainer} path='/additional/user'/>

                <Route component={ProfileContainer} path='/profile'/>
                <Redirect to='/sign-in'/>
            </Switch>
        )
    }
}

export default useRoute