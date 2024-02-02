import React from 'react';
import GeneralHeader from './GeneralHeader';
import Login from './Login';
import { Outlet } from 'react-router-dom';

export default function Layout({ isLoggedIn, setIsLoggedIn, userName }) {
    return (
        <>
            <GeneralHeader isLoggedIn={isLoggedIn} userName={userName} />
            {
                isLoggedIn ? (
                    <div className='mainBody'>
                        <Outlet />
                    </div>) : (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                )
            }

        </>
    );
}
