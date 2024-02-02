import { useState } from "react";

export default function UserDash({ userName }) {

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogoutClick = () => {
        document.cookie = `access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.reload();
        toggleDropdown();
    };

    return (
        <div className="userHeader" onClick={toggleDropdown}>
            <a>Hi, {userName}</a>
            {showDropdown && (
                <div className="dropdown">
                    <button onClick={handleLogoutClick}>Logout</button>
                </div>
            )}
        </div>

    );
}