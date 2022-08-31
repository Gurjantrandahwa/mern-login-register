import React, {useState} from "react";
import "./login.scss";
import {Link, useNavigate} from "react-router-dom";
import {Button, IconButton} from "@material-ui/core";
import {FaFacebookF, FaLinkedinIn} from "react-icons/fa";
import {AiOutlineGooglePlus} from "react-icons/ai";

function Login() {
    const navigate = useNavigate()
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
            navigate("/")
        } else {
            alert("please check your email and password")
        }
    }
    return <div className={"container"}>
        <div className={"register-container"}>
            <div className={"login-text-container"}>
                <div>
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login<br/>
                        with your personal detail
                    </p>
                </div>
            </div>
            <div className={"login-form-container"}>
                <form onSubmit={loginUser}>
                    <h2>Sign in</h2>
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
                    <Link to={"/register"}>
                        <p>or use your detail for registration</p>
                    </Link>
                    <input type={"email"}
                           value={email}
                           required
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder={"Email"}/><br/>

                    <input type={"password"}
                           value={password}
                           required
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder={"Password"}/><br/>
                    <Button className={"login-button"} type={"submit"} value={"Login"}>
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    </div>
}

export default Login