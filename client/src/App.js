import './App.scss';
import React from "react";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";

function App() {
    return <BrowserRouter>
        <div className={"app"}>
            <Routes>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path="*" element={<Navigate to={"/"}/>}/>
            </Routes>
        </div>
    </BrowserRouter>
}

export default App;
