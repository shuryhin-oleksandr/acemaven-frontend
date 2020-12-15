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
import BookingAgentContainer from "../_UI/Pages/Requests/Booking_agent/BookingAgentContainer";
import BookingCardContainer from "../_UI/Pages/Requests/Booking_agent/booking_card/BookingCardContainer";
import {useSelector} from "react-redux";
import {AppStateType} from "../_BLL/store";
import QuoteCardContainer from "../_UI/Pages/quotes/agent/QuoteCardContainer";
import ExactOperationContainer from "../_UI/Pages/operations/agent/ExactOperationContainer/ExactOperationContainer";
import OperationsContainer from 'src/_UI/Pages/operations/OperationsContainer';
import CancelledOperationsContainer from "../_UI/Pages/operations/CANCELLED/CancelledOperationsContainer";
import ChatContainer from "../_UI/Pages/operations/chat/ChatContainer";
import NotificationsContainer from "../_UI/Pages/notifications/NotificationsContainer";



const useRoute = (isAuth: boolean) => {

   const currentUserCompany = useSelector((state:AppStateType) => state.profile.authUserInfo?.companies);
   let type_comp = currentUserCompany && currentUserCompany[0].type


    if (isAuth) {
        return (
            /*<Switch>
                <Route component={AddNewUserContainer} path='/create/user'/>
                <Route component={AddBankAccountContainer} path='/create/bank'/>
                <Route component={ActivateEnd} path='/create/finish'/>
                <Route component={ProfileContainer} path='/settings/profile'/>
                <Route component={CompanySettingsContainer} path='/settings/company'/>
                <Route component={UserManagementContainer} path='/settings/user/management'/>
                <Route component={GeneralSettingsContainer} path='/settings/general'/>

                {type_comp === 'client' && <Route exact component={QuotesContainer} path='/quotes'/>}
                {type_comp === 'client' && <Route component={QuoteCard} path='/quotes/:id'/>}

                {type_comp === 'agent' && <Route component={SurchargesContainer} path='/services/surcharges'/>}
                {type_comp === 'agent' && <Route component={ExactSurchargeContainer} path='/services/surcharge/:id'/>}
                {type_comp === 'agent' && <Route exact component={RatesContainer} path='/services/rates'/>}
                {type_comp === 'agent' && <Route component={ExactRateContainer} path='/services/rate/:id'/>}
                {type_comp === 'agent' && <Route exact component={BookingAgentContainer} path='/requests/booking'/>}
                {type_comp === 'agent' && <Route component={BookingCardContainer} path='/requests/booking/:id'/>}

                <Route exact component={DashboardContainer} path='/'/>
                <Redirect to='/'/>
            </Switch>*/
            <Switch>
                <Route component={AddNewUserContainer} path='/create/user'/>
                <Route component={AddBankAccountContainer} path='/create/bank'/>
                <Route component={ActivateEnd} path='/create/finish'/>
                <Route component={ProfileContainer} path='/settings/profile'/>
                <Route component={CompanySettingsContainer} path='/settings/company'/>
                <Route component={UserManagementContainer} path='/settings/user/management'/>
                <Route component={GeneralSettingsContainer} path='/settings/general'/>

                <Route exact component={QuotesContainer} path='/quotes'/>
                <Route component={QuoteCardContainer} path='/quotes/:id'/>

                <Route component={SurchargesContainer} path='/services/surcharges'/>
                <Route component={ExactSurchargeContainer} path='/services/surcharge/:id'/>
                <Route exact component={RatesContainer} path='/services/rates'/>
                <Route component={ExactRateContainer} path='/services/rate/:id'/>
                <Route exact component={BookingAgentContainer} path='/requests/booking'/>
                <Route component={BookingCardContainer} path='/requests/booking/:id'/>

                <Route component={ExactOperationContainer} path='/operations/:id'/>
                <Route exact component={OperationsContainer} path='/operations_active' />
                <Route component={CancelledOperationsContainer} path='/operations_cancelled'/>
                <Route component={ChatContainer} path='/chat'/>

                <Route component={NotificationsContainer} path='/notifications'/>


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