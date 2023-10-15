import React, {useEffect, useState} from 'react'
import styles from './registration_desktop.module.css'
import Router from 'next/router'
import {Alert, CircularProgress, Snackbar, Tooltip} from '@mui/material'
import {getCookie, setCookie} from 'cookies-next'
import { SmartCaptcha } from '@yandex/smart-captcha'

import ApiTools from '../../lib/apiTools'

const apiTools = new ApiTools()

function Login () {

    // State of page components
    const [pageState, setPageState] = useState({
        captcha: false,
        refreshCaptcha: false,
        error: '',
        buttonLoading: false,
    })

    // State of user data
    const [loginState, setLoginState] = useState({
        login: '',
        password: '',
    })

    const confirmLogin = async function () {

        setPageState({...pageState, refreshCaptcha: true})

        try {

            if (pageState.captcha === true) {
                if (Object.values(loginState).every(value => value !== '')) {

                    setPageState({...pageState, buttonLoading: true})

                    let status = await apiTools.post(
                        '/login',
                        {
                            'username': loginState.login,
                            'password': loginState.password
                        }
                    )

                    if (status.error === false) {

                        /*let userData = {
                            token: status.data,
                        }*/

                        //setCookie('userData', userData)
                        console.log(status.value)
                        await Router.replace({
                            pathname: '../main_screen',
                            //query: userData
                        })

                    } else {
                        console.log(status.value)
                        setPageState({...pageState, error: status.value.reason})
                    }
                } else {
                    setPageState({...pageState, error: 'Все поля должны быть заполнены'})
                }
            } else {
                setPageState({...pageState, error: 'Все поля должны быть заполнены'})
            }
        } catch (e) {
            setPageState({...pageState, error: 'Что-то пошло не так во время отправки данных'})
            console.log("Error: " + e)
        } finally {
            setPageState({...pageState, buttonLoading: false})
        }
    }
    return (
        <div className={styles.mainbg}>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={Boolean(pageState.error)}
                      autoHideDuration={3000} onClose={() => setPageState({...pageState, error: ''})}>
                <Alert severity="error">
                    {pageState.error}
                </Alert>
            </Snackbar>
            <fieldset className={styles.regBox}>
                <legend className={styles.legend}>Логин</legend>
                <span className={styles.prompt} style={{marginRight: '60px'}}>Обратите внимание на правильность заполненных<br/>данных</span>

                <div className={styles.regRow}>
                    <div className={styles.inputDiv}>
                        <span className={styles.textOnInput}>Логин (e-mail)</span>
                        <input className={styles.inputField2}
                               readOnly={pageState.buttonLoading}
                               value={loginState.login}
                               onChange={e => setLoginState({...pageState, login: e.target.value})}
                               onKeyDown={
                                   event => {
                                       (event.key === 'Enter') && confirmLogin()
                                   }}/>
                    </div>
                </div>
                <div className={styles.regRow}>
                    <div className={styles.inputDiv}>
                        <span className={styles.textOnInput}>Пароль</span>
                        <input className={styles.inputField2}
                               type='password'
                               readOnly={pageState.buttonLoading}
                               value={loginState.password}
                               onChange={e => setLoginState({...pageState, password: e.target.value})}
                               onKeyDown={
                                   event => {
                                       (event.key === 'Enter') && confirmLogin()
                                   }}/>
                    </div>
                </div>

                <div style={{marginLeft: '60px', width: '420px'}}>
                    <SmartCaptcha
                        sitekey="ysc1_ALoxRZ4Qx2UJ4EjXKCscQ0Sl25WeHEDgdKo4YwtX103ee32e"
                        onSuccess={value => {
                            setPageState({...pageState, captcha: true})
                        }}
                    />
                </div>

                <div className={styles.buttons1}>
                    <div className={styles.button1}><span className={styles.buttonText}>Яндекс</span></div>
                    {
                        !buttonLoading
                            ? <div className={styles.button2}
                                   onClick={() => confirmLogin()}
                                   onKeyDown={
                                       event => {
                                           (event.key === 'Enter') && confirmLogin()
                                       }}>
                                <span>Продолжить</span>
                            </div>

                            : <div className={styles.button2loading}>
                                <CircularProgress color="inherit" size='25px'/>
                                <span>Проверка</span>
                            </div>
                    }
                </div>
            </fieldset>
        </div>
    )
}

export default Login