import React, {useEffect, useState} from 'react'
import Registration_desktop from './registration_desktop'
import styles from './registration_mobile.module.scss'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Router from 'next/router'
import Profile from '../../lib/getDataFromServer'
import {Alert, CircularProgress, MenuItem, Select, Snackbar, Tooltip, Autocomplete, TextField} from '@mui/material'
import {getCookie, setCookie} from 'cookies-next'

function Registration_mobile ({change, stage}) {

    let [active, setActive] = useState(0)
    const [error, setError] = useState(false)

    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [nickname, setNickname] = useState('')
    const [city, setCity] = useState('')
    const [school, setSchool] = useState('')
    const [mail, setMail] = useState('')
    const [code, setCode] = useState('')

    const [cities, setCities] = useState([])
    const [schools, setSchools] = useState([])


    const carousel = [
        {title: 'ЦИФРОВАЯ ШКОЛА', image: null, description: 'Платформа электронного\nобразования с современными\nвозможностями'},
        {title: 'ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ', image: null, description: 'Современные технологии\nпомогают\nученику и учителю'},
        {title: 'МУЛЬТИПЛАТФОРМЕННОСТЬ', image: null, description: 'Учитесь в школе,\nиз дома,\nи даже в дороге'},
        {title: 'ОНЛАЙН СВЯЗЬ', image: null, description: 'Видеоконференции\nи мессенджер\nупростят работу'},
    ]

    function getCities() {
        Profile.getCities().then(o => {
            if (o.state === 'ok') {
                setCities(o.cities)
            }
        })
    }

    function getSchools(city) {
        Profile.getSchools(city).then(o => {
            if (o.state === 'ok') {
                setSchools(o.schools)
            }
        })
    }

    function Block({item}) {
      return (
          <div className={styles.block}>
              <div className={styles.logo}>
              </div>
              <span className={styles.name}>{item.title}</span>
              <span className={styles.description}>{item.description}</span>
          </div>
      )
    }

    function InputDataField(data) {
        return (
            <div className={styles.inputFieldGroup}>
                <span className={styles.inputFieldTitle}>{data.title}</span>
                <input className={styles.inputField} type="text" onChange={e => data.setData(e.target.value)} value={data.value} placeholder={data.hasOwnProperty('placeholder') && data.placeholder}/>
            </div>
        )
    }

    function Landing() {
        return (
            <div style={{width: '100vw'}} className={styles.main}>
                <div className={styles.slider}>
                    <Carousel showArrows={false} showIndicators={false} showStatus={false} showThumbs={false} infiniteLoop={true} onChange={e => setActive(e)}>
                        {
                            carousel.map(item => {
                                return(
                                    <Block item={item}/>
                                )

                            })
                        }
                    </Carousel>

                    <div className={styles.dotNavigation}>
                        {
                            carousel.map((item, id) => {
                                    return(
                                        <div className={styles.dot} style={id===active ? {background: 'rgba(0, 0, 0, 0.8)'} : {background: 'rgba(0, 0, 0, 0.15)'}}></div>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button1} onClick={() => change('reg1')}>
                        <span>Зарегистрироваться</span>
                    </div>
                    <div className={styles.button2}>
                        <span>Войти на платформу</span>
                    </div>
                </div>
            </div>
        )
    }

    const Reg1 = () => {
        return (
            <div style={{width: '100vw'}} className={styles.main}>
                <div className={styles.slider}>
                    <Carousel showArrows={false} showIndicators={false} showStatus={false} showThumbs={false} onChange={e => setActive(e)}>
                        {
                            carousel.map(item => {
                                return(
                                    <Block item={item}/>
                                )

                            })
                        }
                    </Carousel>

                    <div className={styles.dotNavigation}>
                        {
                            carousel.map((item, id) => {
                                    return(
                                        <div className={styles.dot} style={id===active ? {background: 'rgba(0, 0, 0, 0.8)'} : {background: 'rgba(0, 0, 0, 0.15)'}}></div>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button1}>
                        <span>Продолжить черз госуслуги</span>
                    </div>
                    <div className={styles.button2} onClick={() => change('reg2')}>
                        <span>Самостоятельная регистрация</span>
                    </div>
                </div>
            </div>
        )
    }

    function Reg2() {
        function checkData() {
            if (![surname, name, patronymic].includes('')) {
                change('reg3')
            } else {
                setError('Не все поля заполнены!')
            }
        }

        return (
            <div style={{width: '100vw'}} className={styles.main}>
                <div className={styles.slider}>
                    <Block item={{title: 'УКАЖИТЕ ВАШИ ДАННЫЕ', image: null, description: 'Ваши настоящие имя,\nфамилия и отчество'}}/>
                </div>
                <div className={styles.inputData}>
                    {InputDataField({title: 'Фамилия', 'setData': setSurname, value: surname})}
                    {InputDataField({title: 'Имя', 'setData': setName, value: name})}
                    {InputDataField({title: 'Отчество', 'setData': setPatronymic, value: patronymic})}
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button2} onClick={() => checkData()}>
                        <span>Продолжить</span>
                    </div>
                </div>
            </div>
        )
    }

    const Reg3 = () => {

        function checkData() {
            if (![nickname].includes('')) {
                change('reg4')
            } else {
                setError('Не все поля заполнены!')
            }
        }

        return (
            <div style={{width: '100vw'}} className={styles.main}>
                <div className={styles.slider}>
                    <Block item={{title: 'ВЫБЕРИТЕ ВИРТУАЛЬНОЕ ИМЯ', image: null, description: 'Виртуальное имя - ник. Позволяет\nидентифицировать вас на\nплатформе с помощью\nкороткого тега'}}/>
                </div>
                <div className={styles.inputData}>
                    {InputDataField({title: 'Выберите виртуальное имя', 'setData': setNickname, value: nickname, placeholder: '@nickname'})}
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button2} onClick={() => checkData()}>
                        <span>Продолжить</span>
                    </div>
                </div>
            </div>
        )
    }

    const Reg4 = () => {
        function checkData() {
            if (![city, school].includes('')) {
                change('confirm')
            } else {
                setError('Не все поля заполнены!')
            }
        }

        useEffect(() => {
            getCities()
        }, [])

        return (
            <div style={{width: '100vw'}} className={styles.main}>
                <div className={styles.slider}>
                    <Block item={{title: 'ВЫБЕРЕТЕ МЕСТО УЧЁБЫ', image: null, description: 'Ваше основное место\nобучения и город,\nв котором оно находится'}}/>
                </div>
                <div className={styles.inputData}>
                    <div className={styles.inputFieldGroup}>
                        <span className={styles.inputFieldTitle}>Город</span>
                        <Autocomplete
                            noOptionsText={'Этот город пока что не зарегистрирован'}
                            onChange={(event, newValue) => {
                                setCity(newValue)
                                setSchool('')
                                getSchools(newValue)
                            }}
                            options={cities}
                            renderInput={(params) =>
                            <div ref={params.InputProps.ref}>
                                <input {...params.inputProps} className={styles.inputField}/>
                            </div>
                        }/>
                    </div>
                    <div className={styles.inputFieldGroup}>
                        <span className={styles.inputFieldTitle}>Школа</span>
                        <Autocomplete
                            noOptionsText={'Эта школа пока что не зарегистрирована'}
                            onChange={(event, newValue) => {
                                setSchool(newValue)
                            }}
                            options={schools}
                            renderInput={(params) =>
                                <div ref={params.InputProps.ref}>
                                    <input {...params.inputProps} className={styles.inputField}/>
                                </div>
                            }/>
                    </div>

                </div>
                <div className={styles.buttons}>
                    <div className={styles.button2} onClick={() => checkData()}>
                        <span>Продолжить</span>
                    </div>
                </div>
            </div>
        )
    }

    const Confirm = () => {

        const [buttonCode, setButtonCode] = useState('notValid')
        function checkData() {
            if (![city, school].includes('')) {
                change('confirm')
            } else {
                setError('Не все поля заполнены!')
            }
        }

        function checkCode(event) {

            setCode(event.target.value)

            const isNumeric = n => !!Number(n)
            if (this.state.buttonCode === 'good') {
                //pass
            } else if (event.target.value.length === 6 && isNumeric(event.target.value)) {
                setButtonCode('ok')
            } else {
                setButtonCode('notValid')
            }
        }

        return (
            <div style={{width: '100vw'}} className={styles.main}>
                <div className={styles.slider}>
                    <Block item={{title: 'ВВЕДИТЕ ЭЛЕКТРОННУЮ ПОЧТУ', image: null, description: 'Чтобы завершить регистрацию\nвам необходимо подтверждение\nэлектронной почты'}}/>
                </div>
                <div className={styles.inputData}>
                    <div className={styles.inputFieldGroup}>
                        <span className={styles.inputFieldTitle}>Электронная почта</span>
                        <label className={styles.inputLabel}>
                            <input className={styles.inputField} value={code} onChange={e => checkCode(e)}
                                   readOnly={buttonCode === 'good'}/>
                            <div className={styles.inputInsideButton}>
                                {buttonCode === 'good'
                                    ? <span className={styles.textInInput}>Подтверждено</span>
                                    : buttonCode === 'ok'
                                        ? <span className={styles.textInInput}>Подтвердить</span>
                                        : <span className={styles.textInInput}>Подтвердить</span>
                                }
                            </div>
                        </label>
                    </div>
                    <div className={styles.inputFieldGroup}>
                        <span className={styles.inputFieldTitle}>Проверочный код</span>

                    </div>

                </div>
                <div className={styles.buttons}>
                    <div className={styles.button2} onClick={() => checkData()}>
                        <span>Продолжить</span>
                    </div>
                </div>
            </div>
        )
    }

    function Stage() {
        switch (stage) {
            case 'landing':
                return(
                    Landing()
                )
                break
            case 'reg1':
                return (
                    Reg1()
                )
                break
            case 'reg2':
                return (
                    Reg2()
                )
                break
            case 'reg3':
                return (
                    Reg3()
                )
                break
            case 'reg4':
                return (
                    Reg4()
                )
                break
            case 'confirm':
                return (
                    Confirm()
                )
                break
        }
    }

    return (
        <div>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={error}
                      autoHideDuration={3000} onClose={() => setError(false)}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Snackbar>
            {Stage()}
        </div>
    )

}

export default Registration_mobile