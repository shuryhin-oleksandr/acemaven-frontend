import React from 'react'
import {Redirect, Route, Switch } from 'react-router-dom'
import AddBankAccountContainer from 'src/_UI/Pages/ActivateCompany/AddBankAccount/AddBankAccountContainer';
import AddNewUserContainer from 'src/_UI/Pages/ActivateCompany/CreateNewUser/AddNewUserContainer';
import CreateAccountPage from 'src/_UI/Pages/CreateAccountPage';
import AdditionalUserContainer from "../_UI/Pages/ActivateCompany/AdditionalUser/AdditionalUserContainer";
import ProfileContainer from "../_UI/Pages/Profile&Settings/Profile/ProfileConntainer";
import CompanySettingsContainer from 'src/_UI/Pages/Profile&Settings/CompanySettings/CompanySettingsContainer';
import UserManagementContainer from "../_UI/Pages/Profile&Settings/UserManagement/UserManagementContainer";
import GeneralSettingsContainer from 'src/_UI/Pages/Profile&Settings/GeneralSettings/GeneralSettingsContainer';
import SurchargesContainer from 'src/_UI/Pages/Services&Rates/surcharge/SurchargesContainer';
import ActivateEnd from "../_UI/Pages/ActivateCompany/ActivateEnd";
import ExactSurchargeContainer from 'src/_UI/Pages/Services&Rates/surcharge/surcharges_page/surcharge/ExactSurchargeContainer';
import LandingPage from "../_UI/Pages/landing/LandingPage";
import RatesContainer from "../_UI/Pages/Services&Rates/rates/RatesContainer";
import DashboardContainer from "../_UI/Pages/dashboard/DashboardContainer";
import ExactRateContainer from "../_UI/Pages/Services&Rates/rates/rates_page/rate/ExactRateContainer";
import QuotesContainer from "../_UI/Pages/quotes/client/QuotesContainer";



const useRoute = (isAuth: boolean) => {

    if (isAuth) {
        return (
            <Switch>
                <Route exact component={DashboardContainer} path='/'/>
                <Route component={SurchargesContainer} path='/services/surcharges'/>
                <Route component={ExactSurchargeContainer} path='/services/surcharge/:id'/>
                <Route exact component={RatesContainer} path='/services/rates'/>
                <Route component={ExactRateContainer} path='/services/rate/:id'/>
                <Route component={ProfileContainer} path='/settings/profile'/>
                <Route component={CompanySettingsContainer} path='/settings/company'/>
                <Route component={UserManagementContainer} path='/settings/user/management'/>
                <Route component={GeneralSettingsContainer} path='/settings/general'/>
                <Route component={QuotesContainer} path='/quotes'/>
                {/*<Redirect to='/'/>*/}
            </Switch>

        )
    } else {
        return (
            <Switch>
                <Route component={LandingPage} path='/acemaven'/>
                <Route component={CreateAccountPage} path='/create-account'/>
                <Route component={AddNewUserContainer} path='/create/user'/>
                <Route component={AddBankAccountContainer} path='/create/bank'/>
                <Route component={ActivateEnd} path='/create/finish'/>
                <Route component={AdditionalUserContainer} path='/additional/user'/>
                {/*<Redirect to='/acemaven'/>*/}
            </Switch>
        )
    }
}

export default useRoute