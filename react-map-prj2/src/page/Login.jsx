import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice.js";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const handleLogin = async (e) => {
    //     const response = await axios.post("http://localhost:8080/api/login", {
    //         email: email,
    //         password: password,
    //     });
    //     if (response.data) {
    //         localStorage.setItem('userId', response.data._id);
    //         localStorage.setItem('token', response.data.token);
    //         toast.success("Đăng nhập thành công");
    //         navigate('/');
    //     } else {
    //         toast.error("Đăng nhập thất bại");
    //     }
    // };
    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(login({ email, password }));
        if (localStorage.user) {
            toast.success("Đăng nhập thành công");
            navigate("/");
        } else {
            toast.error("Đăng nhập thất bại");
        }
    };

    return (
        <div>
            <div className="container w-100 h-100">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Đăng nhập</h5>
                            <button
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkRemember"
                                    />
                                    <label className="form-check-label">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ marginRight: "2rem" }}
                                onClick={(e) => handleLogin(e)}
                            >
                                Sign in
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={(e) => navigate("/register")}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
