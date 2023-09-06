import React from 'react'
import styles from './registration_desktop.module.scss'
import Router, {withRouter} from 'next/router'
import Profile from '../../lib/getDataFromServer'
import {getCookie, setCookie} from 'cookies-next'
import {Alert, CircularProgress, Snackbar} from '@mui/material'

class Index extends React.Component {

    constructor(props) {
        super(props)
        console.log(props.router.query)

        this.state = {
            code: '',
            buttonCode: 'notValid',
            newMail: '',
            timeToCode: 40,
            mailSend: false,
        }

        this.code = setInterval(() => this.codeSecond(), 1000)

    }


    checkPage = () => {
        if (!this.props.router.query.token) {
            Router.replace({
                pathname: '/registration'
            })
        }
        this.userData = getCookie('userData')
        if (this.userData) {
            let reg = Profile.cookieLogin(JSON.parse(this.userData).token, JSON.parse(this.userData).password)
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

    codeSecond() {
        this.setState({timeToCode: this.state.timeToCode - 1})
        if (this.state.timeToCode === 1) {
            clearTimeout(this.code)
        }
    }

    checkCode = (event) => {

        this.setState({code: event.target.value})

        const isNumeric = n => !!Number(n)
        if (this.state.buttonCode === 'good') {
            //pass
        } else if (event.target.value.length === 6 && isNumeric(event.target.value)) {
            this.setState({buttonCode: 'ok'})
        } else {
            this.setState({buttonCode: 'notValid'})
        }
    }

    sendNewMail = () => {
        let mail = this.state.newMail
        this.setState({mailSend: true})
        console.log('ok')
    }

    newTimer() {
        this.setState({timeToCode: 59})
        this.code = setInterval(() => this.codeSecond(), 1000)
    }

    sendNewCode(state) {
        if (state === 'ok') {
            this.setState({buttonCode: 'good'})
        }
    }

    codeInput = ({time}) => {
        let change = (even) => console.log(even.target.value)
        return (
            <div className={styles.inputDiv}>
                <span className={styles.textOnInput}>Код с почты</span>
                <label className={styles.inputLabel}>
                    <input className={styles.inputField2} value={this.state.code} onChange={e => this.checkCode(e)}
                           readOnly={this.state.buttonCode === 'good'}/>
                    <div className={styles.inputInsideButton}>
                        {time === 0 && this.state.buttonCode !== 'good'
                            ? <div className={styles.buttonInInput} onClick={() => this.newTimer()}><span
                                className={styles.buttonInInputText}>отправить заново</span></div>
                            : this.state.buttonCode === 'good'
                                ? <span className={styles.textInInput}>почта уже подтверждена</span>
                                : <span className={styles.textInInput}>отправить заново: {time}с</span>
                        }
                    </div>
                </label>
            </div>
        )
    }

    mailInput = ({send}) => {
        return (
            <div className={styles.inputDiv}>
                <span className={styles.textOnInput}>Изменить адрес электронной почты</span>
                <label className={styles.inputLabel}>
                    <input className={styles.inputField2}
                           value={this.state.buttonCode === 'good' ? '' : this.state.newMail}
                           onChange={e => this.setState({newMail: e.target.value})}/>
                    <div className={styles.inputInsideButton}>
                        {send === false && this.state.buttonCode !== 'good'
                            ? <div className={styles.buttonInInput} onClick={() => this.sendNewMail()}><span
                                className={styles.buttonInInputText}>отправить заново</span></div>
                            : this.state.buttonCode === 'good'
                                ? <span className={styles.textInInput}>почта уже подтверждена</span>
                                : <div className={styles.deactiveButtonInInput}><span
                                    className={styles.deactiveButtonInInputText}>отправлено</span></div>
                        }
                    </div>
                </label>
            </div>
        )
    }


    buttonInput = ({type}) => {
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
            <div className={style} onClick={() => this.confirmMail(type)}>
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

                if (this.state.code) {

                    this.setState({buttonCode: 'loading'})

                    error_time = setTimeout(() => {
                        return 1 / 0
                    }, 2000)

                    let reg = await Profile.confirmMail(this.state.code, this.props.router.query.token)
                    if (reg.state === 'ok') {

                        let userData = {
                            token: reg.token,
                            password: reg.password
                        }

                        this.setState({userData: userData})

                        setCookie('userData', userData)

                        this.setState({error: reg.error, buttonCode: 'good'})

                    } else {
                        this.setState({error: reg.error, buttonCode: 'notConfirm'})
                    }


                    } else {
                    this.setState({error: 'Все поля должны быть заполнены'})
                }

            } catch {
                this.setState({error: 'Что-то пошло не так во время отправки данных'})
            } finally {
                clearTimeout(error_time)
            }

        }
    }

    render() {
        return (

            <div className={styles.mainbg}>
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.error}
                          autoHideDuration={3000} onClose={() => this.setState({error: false})}>
                    <Alert severity="error">
                        {this.state.error}
                    </Alert>
                </Snackbar>
                <fieldset className={styles.regBox}>
                    <legend className={styles.legend}>Проверьте вашу почту</legend>
                    <span className={styles.prompt}>Если вы не получили код подтверждения, отправьте запрос<br/>заново, или введите актуальную почту</span>
                    <div className={styles.regRow}>
                        <this.codeInput time={this.state.timeToCode}/>
                        <this.buttonInput type={this.state.buttonCode}/>
                    </div>
                    <div className={styles.regRow}>
                        <this.mailInput send={this.state.mailSend}/>
                    </div>
                    <div className={styles.buttons1}>
                        <div className={styles.button1} onClick={() => Router.back()}><span
                            className={styles.buttonText}>Назад</span></div>
                        {this.state.buttonCode === 'good'
                            ? <div className={styles.button2}><span className={styles.buttonText}
                                                                    onClick={() => Router.replace({
                                                                        pathname: '../main_screen',
                                                                        query: this.state.userData
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

    componentDidMount = () => {
        this.checkPage()
    }
}

export default withRouter(Index)