import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppStateType} from "../_BLL/store";

type PropsType = {
    roles: any,
    component: any,
    currentUserCompany: any
}

export const PrivateRoute:React.FC<PropsType> = ({ component: any, roles, currentUserCompany, ...rest }) => (
    <Route {...rest} render={props => {

        let token = localStorage.getItem('access_token')
        if (!token) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/acemaven', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && currentUserCompany && currentUserCompany[0].type !== roles[0]) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)