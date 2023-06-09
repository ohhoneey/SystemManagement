import React, { useState } from "react"
import {LoginApi} from "./api/login.api";

const Login = (props) => {

    let [authMode, setAuthMode] = useState("signin")

    let [authLogin, authSetLogin] = useState('')
    let [authPass, authSetPass] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [fullName, setFullName] = useState('')
    let [post, setPost] = useState('')
    let [phone, setPhone] = useState('')
    let [userType, setUserType] = useState('')

    function createUser() {
        LoginApi.setNewUser(fullName, email, password, post, phone, userType).then((result) => {
            if (result.status === 200) {
                alert('Register success')
                setAuthMode('signin')
            }
        })
    }

    function loginIn(login, pass) {
        if (!login || !pass) {
            alert('Invalid email or password')
        }

        LoginApi.getUser(login).then((response) => {
            if (response.data.password === pass) {
                props.setUserData(response.data)
            }
        })
    }

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                <a>Sign Up</a>
              </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                value={authLogin}
                                onChange={(event => {authSetLogin(event.target.value)})}
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                onChange={(event => {authSetPass(event.target.value)})}
                                value={authPass}
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>
                    <div className="d-grid gap-2 mt-3" style={{
                        display: 'flex',
                        justifyContent: 'center'}}>
                        <button onClick={() => {loginIn(authLogin, authPass)}} type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            <a>Sign In</a>
            </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            onChange={(event => {setFullName(event.target.value)})}
                            value={fullName}
                            type="text"
                            className="form-control mt-1"
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            onChange={(event => {setEmail(event.target.value)})}
                            value={email}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            onChange={(event => {setPassword(event.target.value)})}
                            value={password}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Your password"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Phone</label>
                        <input
                            onChange={(event => {setPhone(event.target.value)})}
                            value={phone}
                            type="phone"
                            className="form-control mt-1"
                            placeholder="38000000000"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Post</label>
                        <input
                            onChange={(event => {setPost(event.target.value)})}
                            value={post}
                            type="post"
                            className="form-control mt-1"
                            placeholder="Web Designer"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Role</label>
                        <select
                            onChange={(event => {setUserType(event.target.value);})}
                            value={userType}
                            className="form-control mt-1"
                            placeholder=""
                        >
                            <option value="r">Regular</option>
                            <option value="a">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="d-grid gap-2 mt-3" style={{
                    display: 'flex',
                    justifyContent: 'center'}}>
                    <button type="submit" className="btn btn-primary" onClick={() => {createUser()}}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Login