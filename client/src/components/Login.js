import { useState } from 'react';
import { login } from '../frontEndFuncs/miscFuncs';

export default function Login() {
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userName, password)
            .then((res) => {
                console.log('login res', res)
                if (res.ok) {
                    // window.location.reload()

                } else {
                    setError(res.message)
                }
            })
    };

    return (
        <div className='formStyles'>
            <h1>Login</h1>
            {error ? (<p className='errorMessage'>{error}</p>) : null}
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Username</label>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='E.g. John Doe'></input>

                <label>Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
                <input type='submit'></input>

            </form>
        </div>
    )
}