import { useState } from "react";

export default function UserDash({ userName }) {

    const handleLogoutClick = () => {
        document.cookie = `access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.reload();
    };

    return (
        <div className="userHeader">
            <a>Hi, {userName}</a>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>

    );
}