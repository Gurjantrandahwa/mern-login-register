import React, {useId, useState} from "react";
import "./register.scss";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    async function registerUser(event) {
        event.preventDefault()
        const response = await fetch("http://localhost:3001/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
        const data = await response.json()
        if (data === useId) {
            alert("already have account")
        }
        if (data.status === "ok") {
            navigate("/login")
        }
    }

    return <div className={"register"}>

        <form onSubmit={registerUser}>
            <h1>Register</h1>
            <input type={"name"}
                   required
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder={"Name"}/><br/>

            <input type={"email"}
                   value={email}
                   required
                   autoComplete={"off"}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder={"Email"}/><br/>

            <input type={"password"}
                   value={password}
                   required
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder={"Password"}/><br/>
            <button type={"submit"} value={"Register"}>Register</button>
            <Link to={"/login"}>
                <button type={"submit"} value={"Login"}>Login</button>
            </Link>

        </form>
    </div>
}

export default Register