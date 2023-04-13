import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import './style.scss'
import {useTranslation} from "react-i18next";

import UA from '../../assets/images/ua-icon.svg'
import USA from '../../assets/images/usa-icon.svg'
import {setLocale} from "../../store/slices/menu";

const Lang = ({lang}) => {
    const {locale} = useSelector((state) => state.menu);

    const {i18n} = useTranslation();
    const dispatch = useDispatch();
    const switchHandler = () => {
        if (locale === lang) {
            return;
        }
        i18n.changeLanguage(lang);
        dispatch(setLocale(lang));
        localStorage.setItem('lang', lang)
    };

    return (
        <div className={lang !== locale ? 'lang lang__icon--na' : 'lang'}>
            <div className={'lang__icon'} onClick={switchHandler}>
                {lang === 'ua' ? <img src={UA} alt={'ua-flag'}/> :
                    <img src={USA} alt={'usa-flag'}/>}
            </div>

        </div>
    )
};
export default Lang;
