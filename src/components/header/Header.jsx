import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import './Header.css';
import { reset, toggleSidebar } from '../../redux/uiSlice';
import i18n from '../../translation/i18n';
import { useTranslation } from 'react-i18next';

const Header = () => {

    const dispatch = useDispatch();
    const {isOpenSidebar, selectedPark} = useSelector((state) => state.ui);

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
    }

    const {t} = useTranslation();

    return (
        <div className="header">
            <div className='left-div'>
                <img 
                    src={require('../../assets/menu-icon.png')} 
                    style={{width: '3.5rem', cursor: 'pointer'}} 
                    onClick={(e) => dispatch(toggleSidebar())}
                    alt='' 
                />
                <img src={require('../../assets/bike-logo.webp')} alt='' />
            </div>
            <input type='text'></input>
            <div className="right-div">
                <Link to='#'>{t('content.homepage')}</Link>
                <Link to='#'>{t('content.signin')}</Link>
                <Link to='#'>{t('content.contact')}</Link>
                <select onChange={changeLanguage}>
                    <option value="vi">
                        Vietnamese
                    </option>
                    <option value="en">
                        English
                    </option>
                </select>
            </div>
            <div className={!isOpenSidebar? 'sidebar' : 'opened sidebar'}>
                {
                    selectedPark == null?
                    <h2>{t('content.chooseBikePlease')}</h2> :
                    <>
                        <div className='name'>{selectedPark.properties.NAME}</div>
                        <div className="description">{selectedPark.properties.DESCRIPTIO}</div>
                        <label style={{fontWeight: 'bold'}}>{t('content.bikeList')}</label>
                        <div className="bike-list">
                            {
                                selectedPark.properties.bikeList.length === 0?
                                <div>{t('content.noBike')}</div> :
                                selectedPark.properties.bikeList.map((b) => {
                                    return <div className="bike-list-item">
                                        <img src={require(`../../assets/${b.picture}`)} alt="" />
                                        <h4>{t('content.bikePlate')}: {b.plate}</h4>
                                        <p>{t('content.bikeStatus')}: {b.status}</p>
                                    </div>
                                })
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header