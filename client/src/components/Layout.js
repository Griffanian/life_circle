import React from 'react';
import GeneralHeader from './GeneralHeader';
import { Outlet } from 'react-router-dom';
import Login from './Login';
export default function Layout({ isLoggedIn, setIsLoggedIn, userName }) {
    return (
        <>
            <GeneralHeader isLoggedIn={isLoggedIn} userName={userName} />
            {
                isLoggedIn ? (
                    <Outlet />
                ) : (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                )
            }

        </>
    );
}
