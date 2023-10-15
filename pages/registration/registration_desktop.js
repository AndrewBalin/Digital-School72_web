import React, {useEffect, useState} from 'react'
import styles from './registration_desktop.module.css'
import Router from 'next/router'
import {Alert, CircularProgress, Snackbar, Tooltip, Autocomplete} from '@mui/material'
import {getCookie} from 'cookies-next'
import ApiTools from "../../lib/apiTools";

const apiTools = new ApiTools()

function RegistrationDesktop() {

    // State of page components
    const [pageState, setPageState] = useState({
        schools: [],
        cities: [],
        yandex: '',
        error: '',
        buttonLoading: false,
    })

    // State of user data
    const [regState, setRegState] = useState({
        name: '',
        surname: '',
        patronymic: '',
        email: '',
        city: '',
        password: '',
        repeatPassword: '',
        school: '',
        username: '',
    })

    // Registration fields
    const fields = [
        [['Фамилия', styles.inputField1, 'surname'], ['Имя', styles.inputField1, 'name'], ['Отчество', styles.inputField1, 'patronymic']],
        [['Электронная почта', styles.inputField2, 'email', 'Действующий адрес электронной почты не являющийся временной почтой'], ['Город', styles.inputField1, 'city']],
        [['Пароль', styles.inputField2, 'password', 'Во время альфа-тестирования мы не проверяем ваш пароль на надежность'], ['Школа', styles.inputField1, 'school', 'Основное место вашего обучения, дополнительное можно будет добавить потом']],
        [['Повторите пароль', styles.inputField2, 'repeatPassword'], ['Ник на платформе', styles.inputField1, 'username', 'Тег, по которому вас будет легко найти, например ivanivanov']],
    ]

    useEffect(() => {
        getCities()
    }, []);

    // const checkPage = () => { //TODO: need to rewrite it (DRY)
    //
    //     const userData = getCookie('userData')
    //
    //     if (userData) { // TODO: rewrite (this is copied a lot) DRY
    //         let reg = Profile.cookieLogin(JSON.parse(userData).token, JSON.parse(userData).password)
    //         reg.then(o => {
    //             if (o.state === 'ok') {
    //                 let userData = {
    //                     token: JSON.parse(userData).token,
    //                     password: JSON.parse(userData).password
    //                 }
    //
    //                 Router.replace({
    //                     pathname: '../main_screen',
    //                     query: userData
    //                 })
    //             }
    //         })
    //     }
    // }

    const getCities = async () => {
        let status = await apiTools.post('/get_city_list')
        if (!status.error) {
            setPageState({...pageState, cities: status.value.data.map(element => {return element.toLowerCase()})})
        } else {
            setPageState({...pageState, error: 'Возникла проблема на сервере'})
        }
    }

    const getSchools = async (city) => {
        let status = await apiTools.post('/get_school_list_by_city', {city: city.toLowerCase()})
        if (!status.error) {
            setPageState({...pageState, schools: status.value.data})
        } else {
            setPageState({...pageState, error: 'Возникла проблема на сервере'})
        }
    }

    const confirmRegistration = async () => {

        console.log('aboba')

        try {
            console.log(regState)
            if (Object.values(regState).every(value => value !== '')) {
                console.log('aboba 4')
                if (regState.password === regState.repeatPassword) {
                    console.log('aboba 5')

                    setPageState({...pageState, buttonLoading: true})

                    //let reg = await Profile.registration(state.school, st.patronymic, st.name, st.surname, st.email, st.password, st.nickname, st.city)
                    let status = await apiTools.post(
                        '/register_send_mail',
                        regState
                    )

                    if (!status.error) {

                        /*let userData = {
                            token: status.data,
                        }*/

                        //setCookie('userData', userData)
                        console.log(status.value)
                        /*await Router.replace({
                            pathname: './registration/confirm_mail',
                            //query: userData
                        })*/

                        let wait = setInterval(
                            () => {
                                let cookie = getCookie('userData')
                                if (cookie) {
                                    clearInterval(wait)
                                    Router.replace({
                                        pathname: '../main_screen',
                                    })
                                }
                            }, 5000)

                    } else {
                        console.log(status.value)
                        setPageState({...pageState, error: status.value.response.data})
                    }
                } else {
                    setPageState({...pageState, error: 'Пароль и подтверждение пароля не совпадают'})
                }
            } else {
                console.log('hui')
                setPageState({...pageState, error: 'Все поля должны быть заполнены'})
            }
        } catch {
            console.log('aboba 2')
            setPageState({...pageState, error: 'Что-то пошло не так во время отправки данных'})
        } finally {
            setPageState({...pageState, buttonLoading: false})
        }

    }

    const checkRepeatPassword = () => {

    }

    return (
        <div className={styles.mainbg}>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={Boolean(pageState.error)}
                      autoHideDuration={3000} onClose={() => setPageState({...pageState, error: ''})}>
                <Alert onClose={confirmRegistration} severity="error">
                    {pageState.error}
                </Alert>
            </Snackbar>
            <fieldset className={styles.regBox}>
                <legend className={styles.legend}>Регистрация</legend>
                <span className={styles.prompt}>Обратите внимание на правильность заполненных данных</span>
                {fields.map(field =>
                    <RegRow fields={field} pageState={pageState} setPageState={setPageState} regState={regState} setRegState={setRegState} getSchools={getSchools}/>
                )}
                <div className={styles.buttons1}>
                    <div className={styles.button1}><span className={styles.buttonText}>Яндекс</span></div>
                    {
                        !pageState.buttonLoading
                            ? <div className={styles.button2}
                                   onClick={async () => await confirmRegistration()}>
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

const CustomSelect = ({type, pageState, setPageState, regState, setRegState, getSchools}) => {
    return(

        <Autocomplete
            noOptionsText={
                type === 'city'
                    ? 'Этот город пока что не зарегистрирован'
                    : 'Эта школа пока что не зарегистрирована'
            }
            onChange={(event, newValue) => {
                console.log(newValue)
                setRegState({...regState, [type]: newValue})
                if(type === 'city'){
                    setRegState({...regState, city: newValue})
                    getSchools(newValue)
                }}}
            options={
                type === 'city'
                    ? pageState.cities
                    : pageState.schools
            }
            renderInput={(params) =>
                <div ref={params.InputProps.ref}>
                    <input {...params.inputProps} className={styles.inputField1}/>
                </div>
            }
        />
    )
}

const RegRow = ({fields, pageState, setPageState, regState, setRegState, getSchools}) => {
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
                                field[2] === 'city' || field[2] === 'school'
                                    ? <CustomSelect type={field[2]} pageState={pageState} setPageState={setPageState} regState={regState} setRegState={setRegState} getSchools={getSchools}/>
                                    : <input className={field[1]}
                                             readOnly={pageState.buttonLoading}
                                             value={regState[field[2]]} onChange={e => setRegState({...regState, [field[2]]: e.target.value})}/>
                            }
                        </div>
                    )
                }
            )}
        </div>
    )
}



export default RegistrationDesktop