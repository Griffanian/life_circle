import Cookies from 'js-cookie';

export default function UserDash({ userName }) {

    const handleLogoutClick = () => {
        Cookies.remove('access-token')
        window.location.reload();
    };

    return (
        <div className="userHeader">
            <a>Hi, {userName.split(" ")[0]}</a>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>

    );
}