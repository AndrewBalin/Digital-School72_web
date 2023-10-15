import React, {useState} from 'react'
import styles from './registration_desktop.module.css'
import Router, {withRouter} from 'next/router'
import Profile from '../../lib/getDataFromServer'
import {getCookie, setCookie} from 'cookies-next'
import {Alert, CircularProgress, Snackbar} from '@mui/material'

// class Index extends React.Component {

//     constructor(props) {
//         super(props)
        

//     }

//     render() {
        
//     }

//     componentDidMount = () => {
//         checkPage()
//     }
// }

function confirmMail () {

    const [state, setState] = useState({
        code: '',
        buttonCode: 'notValid',
        newMail: '',
        timeToCode: 40,
        mailSend: false,
    })

    let code = setInterval(() => codeSecond(), 1000)

    const checkPage = () => {
        if (!props.router.query.token) {
            Router.replace({
                pathname: '/registration'
            })
        }
        let userData = getCookie('userData')
        if (userData) {
            let reg = Profile.cookieLogin(JSON.parse(userData).token, JSON.parse(userData).password)
            if (reg.state === 'ok') {
                let userData = {
                    token: reg.token,
                    password: reg.password
                }

                Router.replace({
                    pathname: '/main_screen',
                    query: userData
                })
            }
        }
    }

    //checkPage()

    const codeSecond = () => {
        setState({...state, timeToCode: state.timeToCode - 1})
        if (state.timeToCode === 1) {
            clearTimeout(code)
        }
    }

    const checkCode = (event) => {

        setState({...state, code: event.target.value})

        const isNumeric = n => !!Number(n)
        if (state.buttonCode === 'good') {
            //pass
        } else if (event.target.value.length === 6 && isNumeric(event.target.value)) {
            setState({...state, buttonCode: 'ok'})
        } else {
            setState({...state, buttonCode: 'notValid'})
        }
    }

    const sendNewMail = () => {
        let mail = state.newMail
        setState({...state, mailSend: true})
        console.log('ok')
    }

    const newTimer = () => {
        setState({...state, timeToCode: 59})
        code = setInterval(() => codeSecond(), 1000)
    }

    const sendNewCode = (state) => {
        if (state === 'ok') {
            setState({...state, buttonCode: 'good'})
        }
    }

    const CodeInput = ({time}) => {
        let change = (even) => console.log(even.target.value)
        return (
            <div className={styles.inputDiv}>
                <span className={styles.textOnInput}>Код с почты</span>
                <label className={styles.inputLabel}>
                    <input className={styles.inputField2} value={state.code} onChange={e => checkCode(e)}
                           readOnly={state.buttonCode === 'good'}/>
                    <div className={styles.inputInsideButton}>
                        {time === 0 && state.buttonCode !== 'good'
                            ? <div className={styles.buttonInInput} onClick={() => newTimer()}><span
                                className={styles.buttonInInputText}>отправить заново</span></div>
                            : state.buttonCode === 'good'
                                ? <span className={styles.textInInput}>почта уже подтверждена</span>
                                : <span className={styles.textInInput}>отправить заново: {time}с</span>
                        }
                    </div>
                </label>
            </div>
        )
    }

    const MailInput = ({send}) => {
        return (
            <div className={styles.inputDiv}>
                <span className={styles.textOnInput}>Изменить адрес электронной почты</span>
                <label className={styles.inputLabel}>
                    <input className={styles.inputField2}
                           value={state.buttonCode === 'good' ? '' : state.newMail}
                           onChange={e => setState({...state, newMail: e.target.value})}/>
                    <div className={styles.inputInsideButton}>
                        {send === false && state.buttonCode !== 'good'
                            ? <div className={styles.buttonInInput} onClick={() => sendNewMail()}><span
                                className={styles.buttonInInputText}>отправить заново</span></div>
                            : state.buttonCode === 'good'
                                ? <span className={styles.textInInput}>почта уже подтверждена</span>
                                : <div className={styles.deactiveButtonInInput}><span
                                    className={styles.deactiveButtonInInputText}>отправлено</span></div>
                        }
                    </div>
                </label>
            </div>
        )
    }


    const ButtonInput = ({type}) => {
        let style, textStyle, text
        if (type === 'notValid') {
            style = styles.notValidButton
            textStyle = styles.notValidButtonText
            text = 'подтвердить'
        } else if (type === 'notConfirm') {
            style = styles.notConfirmButton
            textStyle = styles.notValidButtonText
            text = 'неверный код'
        } else if (type === 'ok') {
            style = styles.inputButton
            textStyle = styles.inputButtonText
            text = 'подтвердить'
        } else if (type === 'good') {
            style = styles.inputButton
            textStyle = styles.inputButtonText
            text = 'подтверждено'
        } else if (type === 'loading') {
            style = styles.notValidButton
            textStyle = styles.notValidButtonText
            text = 'подтверждено'
        }
        return (
            <div className={style} onClick={() => confirmMail(type)}>
                {
                    type === 'loading' &&
                    <CircularProgress color="inherit" size='25px'/>
                }
                <span className={textStyle}>{text}</span>
            </div>
        )
    }

    confirmMail = async (state) => {

        if (state === 'ok') {

            let error_time

            try {

                if (state.code) {

                    setState({...state, buttonCode: 'loading'})

                    error_time = setTimeout(() => {
                        return 1 / 0
                    }, 2000)

                    let reg = await Profile.confirmMail(state.code, props.router.query.token)
                    if (reg.state === 'ok') {

                        let userData = {
                            token: reg.token,
                            password: reg.password
                        }

                        setState({...state, userData: userData})

                        setCookie('userData', userData)

                        setState({...state, error: reg.error, buttonCode: 'good'})

                    } else {
                        setState({...state, error: reg.error, buttonCode: 'notConfirm'})
                    }


                    } else {
                    setState({...state, error: 'Все поля должны быть заполнены'})
                }

            } catch {
                setState({...state, error: 'Что-то пошло не так во время отправки данных'})
            } finally {
                clearTimeout(error_time)
            }

        }
    }

    return (
        <div className={styles.mainbg}>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={state.error}
                      autoHideDuration={3000} onClose={() => setState({...state, error: false})}>
                <Alert severity="error">
                    {state.error}
                </Alert>
            </Snackbar>
            <fieldset className={styles.regBox}>
                <legend className={styles.legend}>Проверьте вашу почту</legend>
                <span className={styles.prompt}>Если вы не получили код подтверждения, отправьте запрос<br/>заново, или введите актуальную почту</span>
                <div className={styles.regRow}>
                    <CodeInput time={state.timeToCode}/>
                    <ButtonInput type={state.buttonCode}/>
                </div>
                <div className={styles.regRow}>
                    <MailInput send={state.mailSend}/>
                </div>
                <div className={styles.buttons1}>
                    <div className={styles.button1} onClick={() => Router.back()}><span
                        className={styles.buttonText}>Назад</span></div>
                    {state.buttonCode === 'good'
                        ? <div className={styles.button2}><span className={styles.buttonText}
                                                                onClick={() => Router.replace({
                                                                    pathname: '../main_screen',
                                                                    query: state.userData
                                                                })}>
                            Продолжить</span>
                        </div>
                        : <div className={styles.deactiveButton2}><span
                            className={styles.deactiveButtonText}>Продолжить</span></div>
                    }

                </div>
            </fieldset>
        </div>
    )
}

export default confirmMail;