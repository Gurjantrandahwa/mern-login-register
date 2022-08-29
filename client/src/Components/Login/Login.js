import React, {useState} from "react";
import "./login.css";
import {Link} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function loginUser(event) {
        event.preventDefault()
        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        const data = await response.json()
        if (data.user) {
            alert('login successful')
            window.location.href="/"
        } else {
            alert("please check your email and password")
        }

    }

    return <div>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
            <input type={"email"}
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder={"Email"}/><br/>

            <input type={"password"}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder={"Password"}/><br/>
            <button type={"submit"} value={"Login"}>Login</button>
            <br/>
            <Link to={"/register"}>
                <button type={"submit"} value={"Register"}>Register</button>
            </Link>
        </form>
    </div>
}

export default Login