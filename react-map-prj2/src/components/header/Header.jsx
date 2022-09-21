import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useNavigate } from "react-router-dom";
import "./Header.css";
import { reset, toggleSidebar } from "../../redux/uiSlice";
import i18n from "../../translation/i18n";
import { useTranslation } from "react-i18next";
import { logout } from "../../redux/auth/authSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isOpenSidebar, selectedPark } = useSelector((state) => state.ui);
    const isloggedin = useSelector((state) => state.auth?.isLogined);
    const user = useSelector(state => state.auth?.user);

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
    }

    const { t } = useTranslation();

    return (
        <div className="header">
            <div className="left-div">
                <img
                    src={require("../../assets/menu-icon.png")}
                    style={{ width: "3.5rem", cursor: "pointer" }}
                    onClick={(e) => dispatch(toggleSidebar())}
                    alt=""
                />
                <img
                    src={require("../../assets/bike-logo.webp")}
                    alt=""
                    onClick={(e) => navigate("/")}
                />
            </div>
            <input type="text" placeholder="Tìm kiếm"></input>
            <div className="right-div">
                {!isloggedin ? (
                    <>
                        <Link to="/register">{t("Đăng ký")}</Link>
                        <Link to="/login">{t("content.signin")}</Link>
                    </>
                ) : (
                    <>
                        <Link to='#'>user: <span style={{fontWeight: 'bold'}}>{user.name}</span></Link>
                        <Link to="#" onClick={(e) => dispatch(logout())}>
                            {t("content.logout")}
                        </Link>
                    </>
                )}

                <Link to="#">{t("content.contact")}</Link>

                <select onChange={changeLanguage}>
                    <option value="vi">Vietnamese</option>
                    <option value="en">English</option>
                </select>
            </div>
            <div className={!isOpenSidebar ? "sidebar" : "opened sidebar"}>
                {selectedPark == null ? (
                    <h2>{t("content.chooseBikePlease")}</h2>
                ) : (
                    <>
                        <div className="name">
                            {selectedPark.properties.NAME}
                        </div>
                        <div className="description">
                            {selectedPark.properties.DESCRIPTIO}
                        </div>
                        <label style={{ fontWeight: "bold" }}>
                            {t("content.bikeList")}
                        </label>
                        <div className="bike-list">
                            {selectedPark.properties.bikeList.length === 0 ? (
                                <div>{t("content.noBike")}</div>
                            ) : (
                                selectedPark.properties.bikeList.map((b) => {
                                    return (
                                        <div className="bike-list-item">
                                            <img
                                                src={require(`../../assets/${b.picture}`)}
                                                alt=""
                                            />
                                            <h4>
                                                {t("content.bikePlate")}:{" "}
                                                {b.plate}
                                            </h4>
                                            <p>
                                                {t("content.bikeStatus")}:{" "}
                                                {b.status}
                                            </p>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
