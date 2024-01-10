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
                if (res.ok) {
                    console.log(res)
                    window.location.reload()
                } else {
                    setError(res.message)
                }
            })
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>username:
                <input value={userName} onChange={(e) => setUserName(e.target.value)}></input>
            </label>
            <label>password:
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type='submit'></input>
            {error ? (<p>{error}</p>) : null}
        </form>
    )
}