import React from 'react'
import styles from './registration_desktop.module.css'
import Router from 'next/router'
import Profile from '../../lib/getDataFromServer'
import {Alert, CircularProgress, MenuItem, Select, Snackbar, Tooltip, Autocomplete, TextField} from '@mui/material'
import {getCookie, setCookie} from 'cookies-next'

class Registration_desktop extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            schools: [],
            cities: [],
            name: '',
            surname: '',
            patronymic: '',
            email: '',
            city: '',
            password: '',
            repeatPassword: '',
            school: '',
            nick: '',
            yandex: '',
            error: false,
            buttonLoading: false,
        }
    }

    fields = [
        [['Фамилия', styles.inputField1, 'surname'], ['Имя', styles.inputField1, 'name'], ['Отчество', styles.inputField1, 'patronymic']],
        [['Электронная почта', styles.inputField2, 'email', 'Действующий адрес электронной почты не являющийся временной почтой'], ['Город', styles.inputField1, 'city']],
        [['Пароль', styles.inputField2, 'password', 'Во время альфа-тестирования мы не проверяем ваш пароль на верность'], ['Школа', styles.inputField1, 'school', 'Основное место вашего обучения, дополнительное можно будет добавить потом']],
        [['Повторите пароль', styles.inputField2, 'repeatPassword'], ['Ник на платформе', styles.inputField1, 'nickname', 'Тег, по которому вас будет легко найти, например ivanivanov']],
    ]

    checkPage = () => {

        this.userData = getCookie('userData')

        if (this.userData) {
            let reg = Profile.cookieLogin(JSON.parse(this.userData).token, JSON.parse(this.userData).password)
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

    getCities = () => {
        let reg = Profile.getCities()
        reg.then(o => {
            if (o.state === 'ok') {
                this.setState({cities: o.cities})
            }
        })
    }

    getSchools = (city) => {
        let reg = Profile.getSchools(city)
        reg.then(o => {
            if (o.state === 'ok') {
                this.setState({schools: o.schools})
            }
        })
    }

    select = ({type}) => {
        return(

            <Autocomplete
                noOptionsText={
                type === 'city'
                ? 'Этот город пока что не зарегистрирован'
                    : 'Эта школа пока что не зарегистрирована'
            }



                onChange={(event, newValue) => {
                    console.log(newValue)
                    this.setState({[type]: newValue})
                    if(type === 'city'){
                        this.setState({school: ''})
                        this.getSchools(newValue)
                    }}}
                options={
                type === 'city'
                    ? this.state.cities
                    : this.state.schools
                }
                renderInput={(params) =>
                    <div ref={params.InputProps.ref}>
                    <input {...params.inputProps} className={styles.inputField1}/>
                    </div>
                }
            />
        )
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
                                {
                                    field[2] === 'city' ?
                                        <this.select type={field[2]}/>
                                    : field[2] === 'school' ?
                                        <this.select type={field[2]}/>
                                    : <input className={field[1]}
                                            readOnly={(state.yandex !== '' && field[2] === 'email') || this.state.buttonLoading || field[2]==='school'}
                                            value={state[field[2]]} onChange={e => this.setState({[field[2]]: e.target.value})}/>
                                }

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

        try {

            let st = this.state
            if (![st.school, st.patronymic, st.name, st.surname, st.email, st.password, st.nickname, st.city, st.repeatPassword].includes('')) {
                if (st.password === st.repeatPassword) {

                    this.setState({buttonLoading: true})

                    error_time = setTimeout(() => {
                        return 1 / 0
                    }, 2000)

                    let reg = await Profile.registration(st.school, st.patronymic, st.name, st.surname, st.email, st.password, st.nickname, st.city)
                    if (reg.state === 'ok') {

                        let userData = {
                            token: reg.token,
                            password: reg.password
                        }

                        Router.replace({
                            pathname: './registration/confirm_mail',
                            query: userData
                        })
                    } else {
                        this.setState({error: reg.error})
                    }


                } else {
                    this.setState({error: 'Пароль и подтверждение пароля не совпадают'})
                }
            } else {
                this.setState({error: 'Все поля должны быть заполнены'})
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
                    <legend className={styles.legend}>Регистрация</legend>
                    <span className={styles.prompt}>Обратите внимание на правильность заполненных данных</span>
                    {this.fields.map(field =>
                        <this.regRow fields={field} state={this.state}/>
                    )}
                    <div className={styles.buttons1}>
                        <div className={styles.button1}><span className={styles.buttonText}>Яндекс</span></div>
                        {
                            !this.state.buttonLoading
                                ? <div className={styles.button2}
                                       onClick={() => this.confirmRegistration()}>
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
        this.checkPage()
        this.getCities()
    }


}

export default Registration_desktop