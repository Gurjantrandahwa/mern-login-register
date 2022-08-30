import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./home.scss";


function Home() {
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')

    async function populateQuote() {
        const req = await fetch("/api/home", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        const data = await req.json()
        if (data.status === 'ok') {
            setQuote(tempQuote)
        } else {
            alert(data.error)
        }
        console.log(data)
    }

    const tokenKey = "testToken";

    function updateQuote() {
        const token = window.localStorage.getItem(tokenKey)

    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = true
            if (!user) {
                localStorage.removeItem('token')
            } else {
                populateQuote()
            }
        }
    }, [])

    return <div className={"home-page"}>

        {/*<h1>login successfully</h1>*/}
        <h1>Hello:{quote || 'Not found'}</h1>
        <form onSubmit={updateQuote}>
            <input
                type={"text"}
                placeholder={"Quote"}
                value={tempQuote}
                onChange={(e) => {
                    setTempQuote(e.target.value)
                }}/>
            <input type={'submit'} value={'update quote'}/>
        </form>
        <Link to={"/register"}>
            <button type={"submit"} value={"Register"}>Register</button>
        </Link>
    </div>
}

export default Home