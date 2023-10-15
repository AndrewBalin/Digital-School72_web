import React, {useEffect, useState} from 'react'
import styles from './registration_desktop.module.css'
import Router from 'next/router'
import {Alert, CircularProgress, Snackbar, Tooltip} from '@mui/material'
import {getCookie, setCookie} from 'cookies-next'
import { SmartCaptcha } from '@yandex/smart-captcha'

import ApiTools from '../../lib/apiTools'

function Login () {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [captcha, setCaptcha] = useState(false)
    const [refreshCaptcha, setRefreshCaptcha] = useState(false)

    const [apiTools, setApiTools] = useState(new ApiTools())

    /*useEffect(() => {
        setApiTools(new ApiTools())
    }, []);*/

    const confirmLogin = async function () {

        setRefreshCaptcha(true)

        try {

            if (captcha === true) {
                if (![login, password].includes('')) {

                    setButtonLoading(true)

                    let status = await apiTools.post(
                        '/login',
                        {
                            'username': login,
                            'password': password
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
                        setError(status.value.reason)
                    }
                } else {
                    setError('Все поля должны быть заполнены')
                }
            } else {
                setError('Вы должны пройти проверку на робота')
            }
        } catch (e) {
            setError('Что-то пошло не так во время отправки данных')
            console.log("Error: " + e)
        } finally {
            setButtonLoading(false)
        }
    }
        return (
            <div className={styles.mainbg}>
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={Boolean(error)}
                          autoHideDuration={3000} onClose={() => setError(false)}>
                    <Alert severity="error">
                        {error}
                    </Alert>
                </Snackbar>
                <fieldset className={styles.regBox}>
                    <legend className={styles.legend}>Логин</legend>
                    <span className={styles.prompt} style={{marginRight: '60px'}}>Обратите внимание на правильность заполненных<br/>данных</span>

                    <div className={styles.regRow}>
                        <div className={styles.inputDiv}>
                            <span className={styles.textOnInput}>Логин (e-mail)</span>
                            <input className={styles.inputField2}
                                   readOnly={buttonLoading}
                                   value={login} onChange={e => setLogin(e.target.value)}
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
                                   readOnly={buttonLoading}
                                   value={password} onChange={e => setPassword(e.target.value)}
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
                                setCaptcha(true)
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
class OldLogin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: '',
            error: false,
            buttonLoading: false,
            Profile: null,
            capthсa: false,
            refreshReCaptcha: false
        }
    }

    checkPage = (Profile) => {
        this.userData = getCookie('userData')

        if (this.userData) {
            let reg = Profile.cookieLogin(JSON.parse(this.userData).token, JSON.parse(this.userData).password)
            console.log(reg)
            reg.then(o => {
                if (o.state === 'ok') {
                    let userData = {
                        token: JSON.parse(this.userData).token,
                        password: JSON.parse(this.userData).password
                    }

                    Router.replace({
                        pathname: '../main_screen',
                        query: userData
                    })
                }
            })
        }
    }

    regRow = ({fields, state}) => {
        return (
            <div className={styles.regRow}>
                {fields.map(field => {
                        return (
                            <div className={styles.inputDiv}>
                                {
                                    field.length === 4
                                        ? <Tooltip title={field[3]} arrow><span
                                            className={styles.textOnInput}>{field[0]}</span></Tooltip>
                                        : <span className={styles.textOnInput}>{field[0]}</span>
                                }
                                <input className={field[1]}
                                       readOnly={(state.yandex !== '' && field[2] === 'email') || this.state.buttonLoading || field[2]==='school'}
                                       value={state[field[2]]} defaultValue={field[2]==='school' && 'Инфотех: Junior'} onChange={e => this.setState({[field[2]]: e.target.value})}/>
                            </div>
                        )
                    }
                )}
            </div>
        )
    }

    error = () => {
        throw new Error()
    }

    confirmRegistration = async () => {

        let error_time

        await this.setState({refreshReCaptcha: true})

        try {

            let st = this.state
            if (this.state.captcha === true) {
                if (![this.state.login, this.state.password].includes('')) {

                    this.setState({buttonLoading: true})

                    error_time = setTimeout(() => {
                        return 1 / 0
                    }, 2000)

                    let reg = await this.state.Profile.login(this.state.login, this.state.password)
                    if (reg.state === 'ok') {

                        let userData = {
                            token: reg.token,
                            password: reg.password
                        }

                        this.setState({userData: userData})

                        setCookie('userData', userData)

                        await Router.replace({
                            pathname: '../main_screen',
                            query: userData
                        })

                    } else {
                        this.setState({error: reg.error})
                    }
                }
                else {
                    this.setState({error: 'Все поля должны быть заполнены'})
                }
            }

            else {
                this.setState({error: 'Вы должны пройти проверку на робота'})
            }

        } catch {
            this.setState({error: 'Что-то пошло не так во время отправки данных'})
        } finally {
            this.setState({buttonLoading: false})
            clearTimeout(error_time)
        }
    }

    checkRepeatPassword = () => {

    }

    render() {
        return (
            <div className={styles.mainbg}>
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.error}
                          autoHideDuration={3000} onClose={() => this.setState({error: false})}>
                    <Alert onClose={this.confirmRegistration} severity="error">
                        {this.state.error}
                    </Alert>
                </Snackbar>
                <fieldset className={styles.regBox}>
                    <legend className={styles.legend}>Логин</legend>
                    <span className={styles.prompt} style={{marginRight: '60px'}}>Обратите внимание на правильность заполненных<br/>данных</span>

                    <div className={styles.regRow}>
                        <div className={styles.inputDiv}>
                            <span className={styles.textOnInput}>Логин (e-mail)</span>
                            <input className={styles.inputField2}
                                   readOnly={this.state.buttonLoading}
                                   value={this.state.login} onChange={e => this.setState({login: e.target.value})}
                                   onKeyDown={
                                       event => {(event.key === 'Enter') && this.confirmRegistration()}}/>
                        </div>
                    </div>
                    <div className={styles.regRow}>
                        <div className={styles.inputDiv}>
                            <span className={styles.textOnInput}>Пароль</span>
                            <input className={styles.inputField2}
                                   type='password'
                                   readOnly={this.state.buttonLoading}
                                   value={this.state.password} onChange={e => this.setState({password: e.target.value})}
                                   onKeyDown={
                                       event => {(event.key === 'Enter') && this.confirmRegistration()}}/>
                        </div>
                    </div>

                    <div style={{marginLeft: '60px', width: '420px'}}>
                        <SmartCaptcha
                            sitekey="ysc1_ALoxRZ4Qx2UJ4EjXKCscQ0Sl25WeHEDgdKo4YwtX103ee32e"
                            onSuccess={value => {
                                this.setState({captcha: true})
                                console.log(value)
                            }}
                        />
                    </div>
                    {/*<GoogleReCaptchaProvider reCaptchaKey='6Lc7HpokAAAAAD9ULIhxooMjPwW9LsvdQl2i_G00'>
                        <GoogleReCaptcha
                            refreshReCaptcha={this.state.refreshReCaptcha}
                            onVerify={value => {
                                this.setState({captcha: value})
                                console.log(value)
                            }}/>
                    </GoogleReCaptchaProvider>*/}

                    {/*<ReCaptchaV3
                        siteKey={'6Lc7HpokAAAAAD9ULIhxooMjPwW9LsvdQl2i_G00'}
                        onReceiveToken={value => {
                            this.setState({captcha: value})
                            console.log(value)
                        }}/>*/}



                    <div className={styles.buttons1}>
                        <div className={styles.button1}><span className={styles.buttonText}>Яндекс</span></div>
                        {
                            !this.state.buttonLoading
                                ? <div className={styles.button2}
                                       onClick={() => this.confirmRegistration()}
                                       onKeyDown={
                                           event => {(event.key === 'Enter') && this.confirmRegistration()}}>
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

    componentDidMount = () => {
        import ('../../lib/getDataFromServer').then((module) => {
            this.setState({Profile: module.default})
            this.checkPage(module.default)
        })
    }

}

export default Login