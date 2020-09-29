import React from 'react'
import {Redirect, Route, Switch } from 'react-router-dom'
import AddBankAccountContainer from 'src/_UI/Pages/ActivateCompany/AddBankAccount/AddBankAccountContainer';
import AddNewUserContainer from 'src/_UI/Pages/ActivateCompany/CreateNewUser/AddNewUserContainer';
import CreateAccountPage from 'src/_UI/Pages/CreateAccountPage';
import SignInPage from "../_UI/Pages/SignInPage";
import SignUpPage from "../_UI/Pages/SignUpPage";
import AdditionalUserContainer from "../_UI/Pages/ActivateCompany/AdditionalUser/AdditionalUserContainer";
import ProfileContainer from "../_UI/Pages/Profile&Settings/Profile/ProfileConntainer";
import CompanySettingsContainer from 'src/_UI/Pages/Profile&Settings/CompanySettings/CompanySettingsContainer';
import UserManagementContainer from "../_UI/Pages/Profile&Settings/UserManagement/UserManagementContainer";
import GeneralSettingsContainer from 'src/_UI/Pages/Profile&Settings/GeneralSettings/GeneralSettingsContainer';
import SurchargesContainer from 'src/_UI/Pages/Services&Rates/surcharge/SurchargesContainer';
import ActivateEnd from "../_UI/Pages/ActivateCompany/ActivateEnd";
import SignUpFinishPopup from "../_UI/components/PopUps/sign_up/SignUpFinishPopup";
import ExactSurchargeContainer from 'src/_UI/Pages/Services&Rates/surcharge/surcharges_page/surcharge/ExactSurchargeContainer';



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
                <Route component={SignUpFinishPopup} path='/sign-up/done'/>
                <Route component={CreateAccountPage} path='/create-account'/>

                <Route component={AddNewUserContainer} path='/create/user'/>
                <Route component={AddBankAccountContainer} path='/create/bank'/>
                <Route component={ActivateEnd} path='/create/finish'/>

                <Route component={AdditionalUserContainer} path='/additional/user'/>
                <Route exact component={SurchargesContainer} path='/services/surcharges'/>
                <Route component={ExactSurchargeContainer} path='/services/surcharges/id'/>
                <Route component={ProfileContainer} path='/settings/profile'/>
                <Route component={CompanySettingsContainer} path='/settings/company'/>
                <Route component={UserManagementContainer} path='/settings/user/management'/>
                <Route component={GeneralSettingsContainer} path='/settings/general'/>

            </Switch>
        )
    }
}

export default useRoute