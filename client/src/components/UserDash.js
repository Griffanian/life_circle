export default function UserDash({ userName }) {

    const HandleClick = () => {
        document.cookie = `access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.reload();
    }

    return (
        <div>
            <p>Logged in as {userName}</p>
            <button className="logoutButton" onClick={() => HandleClick()}>Logout</button>
        </div>
    )
}