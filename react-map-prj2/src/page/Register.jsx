import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [age, setAge] = useState(Number);
    const [gender, setGender] = useState(String);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        try {
            dispatch(register({
                name, age, gender, phone, address, email, password
            }));
            toast.success('Đăng ký thành công');
            navigate('/login');
        } catch (error) {
            toast.success(error);
        }
    }

    return (
        <div>
            <div className="container w-100 h-100">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Đăng kí</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form type="button">
                                <div className="form-group">
                                    <label>Full name</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter full name"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tuổi</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Nhập tuổi"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Giới tính</label>
                                    <div className="d-flex">
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="gender"
                                                aria-describedby="gender"
                                                value='nam'
                                                onChange={e => setGender('nam')}
                                            />
                                            <label>Nam</label>
                                        </div>
                                        <div className="form-check ml-5">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="gender"
                                                aria-describedby="gender"
                                                value='nữ'
                                                onChange={e => setGender('nữ')}
                                            />
                                            <label>Nữ</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Nhập số điện thoại"
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Nhập địa chỉ"
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Nhập email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={e => navigate('/')}
                            >
                                Đóng
                            </button>
                            <button type="button" className="btn btn-primary" onClick={e => handleRegister()}>
                                Lưu và gửi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
