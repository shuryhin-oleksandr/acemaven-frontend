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
import QuotesContainer from "../_UI/Pages/quotes/QuotesContainer";
import QuoteCard from "../_UI/Pages/quotes/agent/QuoteCard";
import BookingAgentContainer from "../_UI/Pages/Requests/Booking_agent/BookingAgentContainer";
import {useSelector} from "react-redux";
import {AppStateType} from "../_BLL/store";
import BookingCardContainer from "../_UI/Pages/Requests/Booking_agent/booking_card/BookingCardContainer";



const useRoute = (isAuth: boolean) => {
   enum Role {
        Admin = 'Admin',
        User = 'Client'
    }

    const currentUserCompany = useSelector((state:AppStateType) => state.profile.authUserInfo?.companies);


    if (isAuth) {
        return (
            <Switch>
                <Route component={AddNewUserContainer} path='/create/user'/>
                <Route component={AddBankAccountContainer} path='/create/bank'/>
                <Route component={ActivateEnd} path='/create/finish'/>
                <Route component={SurchargesContainer} path='/services/surcharges'/>
                <Route component={ExactSurchargeContainer} path='/services/surcharge/:id'/>
                <Route exact component={RatesContainer} path='/services/rates'/>
                <Route component={ExactRateContainer} path='/services/rate/:id'/>
                <Route component={ProfileContainer} path='/settings/profile'/>
                <Route component={CompanySettingsContainer} path='/settings/company'/>
                <Route component={UserManagementContainer} path='/settings/user/management'/>
                <Route component={GeneralSettingsContainer} path='/settings/general'/>
                <Route exact component={QuotesContainer} path='/quotes'/>
                <Route component={QuoteCard} path='/quotes/:id'/>
                <Route exact component={BookingAgentContainer} path='/requests/booking'/>
                <Route component={BookingCardContainer} path='/requests/booking/:id'/>
                <Route exact component={DashboardContainer} path='/'/>
                <Redirect to='/'/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route component={LandingPage} path='/acemaven'/>
                <Route component={CreateAccountPage} path='/create-account'/>
                <Route component={AdditionalUserContainer} path='/additional/user'/>
                <Redirect to='/acemaven'/>
            </Switch>
        )
    }
}

export default useRoute