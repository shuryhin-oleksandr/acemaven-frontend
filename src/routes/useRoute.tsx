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
import QuoteCardContainer from "../_UI/Pages/quotes/agent/QuoteCardContainer";
import ExactOperationContainer from "../_UI/Pages/operations/agent/ExactOperationContainer/ExactOperationContainer";
import OperationsContainer from 'src/_UI/Pages/operations/OperationsContainer';
import CancelledOperationsContainer from "../_UI/Pages/operations/CANCELLED/CancelledOperationsContainer";
import ChatContainer from "../_UI/Pages/operations/chat/ChatContainer";
import NotificationsContainer from "../_UI/Pages/notifications/NotificationsContainer";
import AgentBillingContainer from "../_UI/Pages/billing/agent/exchange/AgentBillingContainer";
import AgentBillingInProgressContainer
    from "../_UI/Pages/billing/agent/billing_in_progress/AgentBillingInProgressContainer";
import BillingDetailsPageContainer
    from "../_UI/Pages/billing/agent/billing_in_progress/billing_details_page/BillingDetailsPageContainer";
import AgentBillingCompletedContainer from "../_UI/Pages/billing/agent/completed/AgentBillingCompletedContainer";
import BillingPendingContainer from "../_UI/Pages/billing/client/BillingPending/BillingPendingContainer";
import BillingCompleteContainer from "../_UI/Pages/billing/client/BillingComplete/BillingCompleteContainer";
import BillingInProgressContainer
    from "../_UI/Pages/billing/client/BillingInProgressContainer/BillingInProgressContainer";
import CompletedOperationsContainer from "../_UI/Pages/operations/COMPLETED/CompletedOperationsContainer";
import HelpSupportContainer from "../_UI/Pages/help&support/HelpSupportContainer";
import SupportChatContainer from "../_UI/Pages/help&support/SupportChat/SupportChatContainer";




const useRoute = (isAuth: boolean) => {


    if (isAuth) {
        return (
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

                <Route exact component={ExactOperationContainer} path='/operations/:id'/>
                <Route exact component={ExactOperationContainer} path='/operations/:id/chat'/>
                <Route exact component={OperationsContainer} path='/operations_active' />
                <Route exact component={CompletedOperationsContainer} path='/operations_completed'/>
                <Route component={CancelledOperationsContainer} path='/operations_cancelled'/>
                <Route component={ChatContainer} path='/chat'/>

                <Route component={AgentBillingContainer} path='/billing_exchange'/>
                <Route exact component={AgentBillingInProgressContainer} path='/billing_in_progress'/>
                <Route component={BillingDetailsPageContainer} path='/billing_in_progress/:id'/>
                <Route exact component={AgentBillingCompletedContainer} path='/billing_completed'/>

                <Route component={NotificationsContainer} path='/notifications'/>


                <Route component={BillingPendingContainer} path='/billing_pending'/>
                <Route component={BillingCompleteContainer} path='/billing_complete'/>
                <Route exact component={BillingInProgressContainer} path='/billing_in_progress_client'/>

                <Route exact component={HelpSupportContainer} path={'/support'}/>
                <Route exact component={SupportChatContainer} path={'/support/:id'}/>

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