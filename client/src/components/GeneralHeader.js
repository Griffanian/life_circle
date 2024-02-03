import circleLogo from '../images/circle.png';
import UserDash from './UserDash';
import { Link } from 'react-router-dom';

export default function GeneralHeader({ userName, isLoggedIn }) {
    return (
        <div className="generalHeader">
            <Link to={"/clients"}>
                <div className='logo'>

                    <img src={circleLogo} alt="circle logo" />
                    <p className='companyName'>The Circle of Life</p>
                </div>
            </Link>
            {
                isLoggedIn ? (
                    <UserDash userName={userName} />)
                    : (<></>)
            }

        </div>
    )
}