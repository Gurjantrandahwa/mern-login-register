import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import jwt from "jsonwebtoken";


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

    async function updateQuote(event) {
        event.preventDefault()
        const req = await fetch("/api/home", {
            method: 'Post',
            headers: {
                'Content-Type':'application/json',
                'x-access-token': localStorage.getItem('token')
            },body:JSON.stringify({
                quote:tempQuote,
            })

        })
        const data = await req.json()
        if (data.status === 'ok') {
            setTempQuote('')
            setQuote(data.quote)
        } else {
            alert(data.error)
        }
        console.log(data)
    }

    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode()
            if (!user) {
                localStorage.removeItem('token')
                navigate("/login")
            } else {
                populateQuote()
            }
        }
    }, [])

    return <div>
        <Link to={"/register"}>
            <button type={"submit"} value={"Register"}>Register</button>
        </Link>
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
    </div>
}

export default Home