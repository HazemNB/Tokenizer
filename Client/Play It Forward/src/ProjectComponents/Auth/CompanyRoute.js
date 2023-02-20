import React, { useEffect, useState } from 'react';
import { Route, Redirect, Navigate, RouteComponent } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../Loader';

import { useContext } from "react";
import { UserContext } from "App";
import SoftButton from 'components/SoftButton';
/* eslint react/prop-types: 0 */
const CompanyRoute = ({ children }) => {
    const User = useContext(UserContext)

    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <Loader />
    }

    if (user) {
        if (User == null) {
            return(
            <div className='loaderDiv'>
                <h1>User data not loaded. Please Refresh.</h1>
                <SoftButton color="secondary" fullWidth onClick={() => {
                    getAuth().signOut();
                }}>
                    Logout
                </SoftButton>
            </div>)
        }
        if (User.userType != "CompanyAdmin" && User.userType != "CompanyUser" && User.userType != "SuperAdmin") {
            return(
            <div className='loaderDiv'>
                <h1>ACCESS DENIED</h1>
                <SoftButton color="secondary" fullWidth onClick={() => {
                    getAuth().signOut();
                }}>
                    Logout
                </SoftButton>
            </div>)
        }
        if (User.isActivated === false) {
            return(
                <div className='loaderDiv'>

                    <h1>DeActivated Account</h1>
                    <SoftButton color="secondary" fullWidth onClick={() => {
                        getAuth().signOut();
                    }}>
                        Logout
                    </SoftButton>
                </div>)
        }
        else if (User.isSoftDeleted === true) {
            return(
                <div className='loaderDiv'>

                    <h1>Deleted Account</h1>
                    <SoftButton color="secondary" fullWidth onClick={() => {
                        getAuth().signOut();
                    }}>
                        Logout
                    </SoftButton>
                </div>)
        }
        else if (User.userType === "UnAssigned") {
            return <div>You are unassigned</div>
        }
        return (children)
    }
    else {
        return <Navigate to="/login" />
    }

}

export default CompanyRoute