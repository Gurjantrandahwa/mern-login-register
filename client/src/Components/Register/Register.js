import React, {useId, useState} from "react";
import "./register.scss";
import {Link, useNavigate} from "react-router-dom";
import {Button, IconButton} from "@material-ui/core";
import {FaFacebookF, FaLinkedinIn} from "react-icons/fa";
import {AiOutlineGooglePlus} from "react-icons/ai";

function Register() {

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

    return <div className={"container"}>
        <div className={"register-container"}>
            <div className={"form-container"}>
                <form onSubmit={registerUser}>
                    <h2>Create Account</h2>
                    <div className={"icon-button"}>
                        <IconButton>
                            <FaFacebookF/>
                        </IconButton>
                        <IconButton>
                            <AiOutlineGooglePlus/>
                        </IconButton>
                        <IconButton>
                            <FaLinkedinIn/>
                        </IconButton>
                    </div>
                    <Link to={"/login"}>
                        <p>or login your account</p>
                    </Link>

                    <input type={"email"}
                           value={email}
                           required
                           autoComplete={"off"}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder={"Email"}/>

                    <input type={"password"}
                           value={password}
                           required
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder={"Password"}/><br/>
                    <Button className={"sign-button"} type={"submit"} value={"Register"}>Sign up</Button>
                </form>
            </div>
            <div className={"text-container"}>
                <div className={"text-container-text"}>
                    <h1>Hi There!</h1>
                    <p>Enter Your personal details to open an
                        account with us</p>
                </div>
            </div>
        </div>

    </div>
}

export default Register