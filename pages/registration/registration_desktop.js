import React, {useState} from 'react'
import styles from './registration_desktop.module.css'
import Router from 'next/router'
import Profile from '../../lib/getDataFromServer'
import {Alert, CircularProgress, MenuItem, Select, Snackbar, Tooltip, Autocomplete, TextField} from '@mui/material'
import {getCookie, setCookie} from 'cookies-next'


function Registration_desktop() {

    

    const [state, setState] = useState({
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
    })

    const fields = [
        [['Фамилия', styles.inputField1, 'surname'], ['Имя', styles.inputField1, 'name'], ['Отчество', styles.inputField1, 'patronymic']],
        [['Электронная почта', styles.inputField2, 'email', 'Действующий адрес электронной почты не являющийся временной почтой'], ['Город', styles.inputField1, 'city']],
        [['Пароль', styles.inputField2, 'password', 'Во время альфа-тестирования мы не проверяем ваш пароль на верность'], ['Школа', styles.inputField1, 'school', 'Основное место вашего обучения, дополнительное можно будет добавить потом']],
        [['Повторите пароль', styles.inputField2, 'repeatPassword'], ['Ник на платформе', styles.inputField1, 'nickname', 'Тег, по которому вас будет легко найти, например ivanivanov']],
    ]

    const checkPage = () => {

        const userData = getCookie('userData')

        if (userData) { // TODO: rewrite (this is copied a lot) DRY
            let reg = Profile.cookieLogin(JSON.parse(userData).token, JSON.parse(userData).password)
            reg.then(o => {
                if (o.state === 'ok') {
                    let userData = {
                        token: JSON.parse(userData).token,
                        password: JSON.parse(userData).password
                    }

                    Router.replace({
                        pathname: '../main_screen',
                        query: userData
                    })
                }
            })
        }
    }

    const getCities = () => {
        let reg = Profile.getCities()
        reg.then(o => {
            if (o.state === 'ok') {
                setState({...state, cities: o.cities})
            }
        })
    }

    checkPage()
    getCities()

    const getSchools = (city) => {
        let reg = Profile.getSchools(city)
        reg.then(o => {
            if (o.state === 'ok') {
                setState({...state, schools: o.schools})
            }
        })
    }

    const CustomSelect = ({type}) => {
        return(

            <Autocomplete
                noOptionsText={
                type === 'city'
                ? 'Этот город пока что не зарегистрирован'
                    : 'Эта школа пока что не зарегистрирована'
            }
                onChange={(event, newValue) => {
                    console.log(newValue)
                    setState({...state, [type]: newValue})
                    if(type === 'city'){
                        setState({...state, school: ''})
                        getSchools(newValue)
                    }}}
                options={
                type === 'city'
                    ? state.cities
                    : state.schools
                }
                renderInput={(params) =>
                    <div ref={params.InputProps.ref}>
                    <input {...params.inputProps} className={styles.inputField1}/>
                    </div>
                }
            />
        )
    }

    const RegRow = ({fields}) => {
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
                                        <CustomSelect type={field[2]}/>
                                    : field[2] === 'school' ?
                                        <CustomSelect type={field[2]}/>
                                    : <input className={field[1]}
                                            readOnly={(state.yandex !== '' && field[2] === 'email') || state.buttonLoading || field[2]==='school'}
                                            value={state[field[2]]} onChange={e => setState({...state, [field[2]]: e.target.value})}/>
                                }

                            </div>
                        )
                    }
                )}
            </div>
        )
    }

    const error = () => {
        throw new Error()
    }

    const confirmRegistration = async () => {

        let error_time

        try {

            let st = state
            if (![st.school, st.patronymic, st.name, st.surname, st.email, st.password, st.nickname, st.city, st.repeatPassword].includes('')) {
                if (st.password === st.repeatPassword) {

                    setState({...state, buttonLoading: true})

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
                        setState({...state, error: reg.error})
                    }


                } else {
                    setState({...state, error: 'Пароль и подтверждение пароля не совпадают'})
                }
            } else {
                setState({...state, error: 'Все поля должны быть заполнены'})
            }

        } catch {
            setState({...state, error: 'Что-то пошло не так во время отправки данных'})
        } finally {
            setState({...state, buttonLoading: false})
            clearTimeout(error_time)
        }


    }

    const checkRepeatPassword = () => {

    }

    return (
        <div className={styles.mainbg}>
            <test></test>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={state.error}
                      autoHideDuration={3000} onClose={() => setState({...state, error: false})}>
                <Alert onClose={confirmRegistration} severity="error">
                    {state.error}
                </Alert>
            </Snackbar>
            <fieldset className={styles.regBox}>
                <legend className={styles.legend}>Регистрация</legend>
                <span className={styles.prompt}>Обратите внимание на правильность заполненных данных</span>
                {fields.map(field =>
                    <RegRow fields={field}/>
                )}
                <div className={styles.buttons1}>
                    <div className={styles.button1}><span className={styles.buttonText}>Яндекс</span></div>
                    {
                        !state.buttonLoading
                            ? <div className={styles.button2}
                                   onClick={() => confirmRegistration()}>
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


class Registration_desktop_old extends React.Component {

    constructor(props) {
        super(props)

        
    }

    

    render() {
        
    }

    componentDidMount = () => {
        
    }


}

export default Registration_desktop