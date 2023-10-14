import React from 'react'
import styles from './main_page.module.css'
import Image from 'next/image'
import Router from 'next/router'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined'
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import Link from "next/link";


const style = {
    mainbg: {
        margin: '0',
        width: '100%',
        background: '#171720',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        alignSelf: 'flex-start',
        justifySelf: 'flex-start',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        minHeight: '94px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.02)',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '28px 0',
        gap: '23px'
    },
    label: {
        fontFamily: 'Effra',
        fontWeight: '500',
        fontSize: '30px',
        lineHeight: '36px',
        color: '#ffffff',
        marginLeft: '0',
        marginRight: '0',
    },
    labelButtons: {
        marginLeft: '0',
        marginRight: '0',
        height: '47px',
        display: 'flex',
        justifyContent: 'center',
        gap: '23px'
    },
    button: {
        marginLeft: 'auto',
        marginRight: '0',
        background: '#F06400',
        borderRadius: '5px',
        width: '103px',
        height: '47px',
        display: 'flex',
    },
    buttonText: {
        fontFamily: 'Effra',
        fontWeight: '400',
        fontSize: '20px',
        lineHeight: '24px',
        textAlign: 'center',
        color: "#ffffff",
        margin: 'auto'
    },
    outlineButtonText: {
        fontFamily: 'Effra',
        fontWeight: '400',
        fontSize: '20px',
        lineHeight: '24px',
        color: "#ffffff",
        margin: 'auto',
        marginLeft: 'auto',
        marginRight: '0',

    },
    page: {
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
    },
    rec1: {
        width: '20px',
        height: 'calc(100%/3)',
        background: '#F06400',
    },
    rec2: {
        width: '20px',
        height: 'calc(100%/3)',
        background: 'rgba(240, 100, 0, 0.8)',
    },
    rec3: {
        width: '20px',
        height: 'calc(100%/3)',
        background: 'rgba(240, 100, 0, 0.6)',
    },
    rec: {
        width: '20px',
        marginRight: '23px',
        alignSelf: 'stretch',
    },
    op: {
        flexDirection: 'column',
        display: 'flex',
        wordWrap: 'break-word',
    },
    opg: {
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        height: 'auto',
    },
    text1: {
        fontFamily: 'Effra',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '42px',
        lineHeight: '50px',
        color: '#ffffff',
        marginBottom: '15px',
        marginTop: '15px',
        wordWrap: 'break-word',
    },
    text2: {
        wordWrap: 'break-word',
        fontFamily: 'Effra',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '28px',
        lineHeight: '33px',
        color: '#ffffff',
        marginBottom: '15px'
    },
    main: {
        width: '90%',
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: '20px',
        marginTop: 'auto',
        marginBottom: 'auto',

    },
    action: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: 'min(90%, 460px)',
        maxWidth: 'min(90%, 600px)',
    },
    action2: {
        backgroundSize: '100% 100%',
        minHeight: '400px',
        minWidth: 'min(90%, 460px)',
        maxWidth: 'min(90%, 600px)',
    },
    buttonsAc1: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '66px',
        flexWrap: 'wrap',
        gap: '20px'
    },
    button1Ac1: {
        background: '#F06400',
        height: '74px',
        minWidth: '185px',
        maxWidth: '195px',
        display: 'flex',
        borderRadius: '5px',
    },
    button2Ac1: {
        background: 'rgba(255, 255, 255, 0.26)',
        height: '74px',
        minWidth: '185px',
        maxWidth: '195px',
        display: 'flex',
        borderRadius: '5px'
    },
    buttonTextAc1: {
        fontFamily: 'Effra',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '25px',
        lineHeight: '30px',
        textAlign: 'center',
        color: '#ffffff',
        margin: 'auto',
    },
    text3: {
        alignSelf: 'start',
        fontFamily: 'Effra',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '42px',
        lineHeight: '50px',
        color: '#ffffff'
    },
    carousel: {
        display: 'flex',
        marginLeft: '0',
        gap: '41px',
        flexWrap: 'nowrap',
        overflow: 'auto',
        marginBottom: '10px',
    },
    carouselBlock: {
        height: '250px',
        width: '250px',
        background: '#ffffff',
        flex: '0 0 auto',
    },
    circleMain: {
        display: 'flex',
        margin: 'auto',
    },
    circle1: {
        display: 'flex',
        margin: 'min(8vh, 8vw)',
        background: 'rgba(217, 217, 217, 0.05)',
        border: '1px solid #ffffff',
        borderRadius: '50%',
    },
    circle2: {
        width: 'auto',
        display: 'flex',
        margin: 'min(8vh, 8vw)',
        background: 'rgba(255, 255, 255, 0.07)',
        border: '1px solid #ffffff',
        borderRadius: '50%',
    },
    circle3: {
        width: 'auto',
        display: 'flex',
        margin: 'min(8vh, 8vw)',
        background: '#F06400',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
    },
    circleImg: {
        width: 'min(15vh, 15vw)',
        margin: 'min(3vh, 3vw)',
    }


}

class Main_page extends React.Component {

    render() {
        return(
            <div style={style.mainbg} className={styles.bg}>
                <div style={style.page}>
                    <div style={style.header}>
                        <span style={style.label}>Цифровая Школа</span>
                        <div style={style.labelButtons}>
                            <span style={style.outlineButtonText} onClick={() => Router.push('./registration')}>Регистрация</span>
                            <div style={style.button} onClick={() => Router.push('./registration/login')}><span style={style.buttonText}>Вход</span></div>
                        </div>
                    </div>
                    <div style={style.main}>
                        <div style={style.action}>
                            <div style={style.opg} className='bord'>
                                <div style={style.rec}>
                                    <div style={style.rec1}/>
                                    <div style={style.rec2}/>
                                    <div style={style.rec3}/>
                                </div>
                                <div style={style.op} lang='ru'>
                                    <span style={style.text1}>Новая эра электронного образования </span>
                                    <span style={style.text2}>Наш электронный дневник, призванный облегчить жизнь всем участникам учебного процесса, уже доступен для <b>альфа тестирования</b>! Станьте участниками теста совершенно бесплатно!</span>
                                </div>
                            </div>
                            <div style={style.buttonsAc1}>
                                <div style={style.button1Ac1} onClick={() => Router.push('./registration')}><span style={style.buttonTextAc1}>Регистрация</span></div>
                                <div style={style.button2Ac1} onClick={() => window.open('https://vk.com/digitalschool72', "_blank")}><span style={style.buttonTextAc1}>Подробнее</span></div>
                            </div>
                        </div>
                        <div style={style.action2}>
                            <Image src={require('../assets/img6.png')}/>
                        </div>
                    </div>
                </div>

                <div style={style.page}>
                    <div className={styles.main2}>
                        <span style={style.text3}>Наши функции</span>
                        <div className={styles.carousel}>
                            <div style={style.carouselBlock}>
                                <Image src={require('../assets/img1.png')}/>
                            </div>
                            <div style={style.carouselBlock}>
                                <Image src={require('../assets/img2.png')}/>
                            </div>
                            <div style={style.carouselBlock}>
                                <Image src={require('../assets/img3.png')}/>
                            </div>
                            <div style={style.carouselBlock}>
                                <Image src={require('../assets/img4.png')}/>
                            </div>
                            <div style={style.carouselBlock}>
                                <Image src={require('../assets/img5.png')}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={style.page} className='test'>
                    <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '5%'}}>
                            <AccountCircleOutlinedIcon style={{fontSize: 60, color: '#F06400'}}/>
                            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                                <span style={{color: '#FFFFFF', fontStyle: 'Effra', fontSize: '25px', marginBottom: '3px'}}>Простота использования</span>
                                <span style={{color: '#FFFFFF', fontStyle: 'Effra', fontSize: '15px', marginTop: '3px'}}>Всё на одной платформе</span>
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginRight: '5%'}}>
                            <DeveloperBoardOutlinedIcon style={{fontSize: 60, color: '#F06400'}}/>
                            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                                <span style={{color: '#FFFFFF', fontStyle: 'Effra', fontSize: '25px', marginBottom: '3px'}}>Машинное обучение</span>
                                <span style={{color: '#FFFFFF', fontStyle: 'Effra', fontSize: '15px', marginTop: '3px'}}>Поможет с обучением и анализом данных</span>
                            </div>
                        </div>
                    </div>
                    <div style={style.circleMain}>
                        <div style={style.circle1}>
                            <div style={style.circle2}>
                                <div style={style.circle3}>
                                    <div style={style.circleImg}>
                                        <Image src={require('../assets/landing_hat.png')} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5%', flexWrap: 'wrap'}}>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '5%'}}>
                            <AccountTreeOutlinedIcon style={{fontSize: 60, color: '#F06400'}}/>
                            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                                <span style={{color: '#FFFFFF', fontStyle: 'Effra', fontSize: '25px', marginBottom: '3px'}}>Онлайн платформа</span>
                                <span style={{color: '#FFFFFF', fontStyle: 'Effra', fontSize: '15px', marginTop: '3px'}}>Учись в своей школе очно или посещай онлайн-<br/>элективы из любой<br/>точки мира</span>
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginRight: '5%'}}>
                            <CropFreeOutlinedIcon style={{fontSize: 60, color: '#F06400'}}/>
                            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                                <span style={{color: '#FFFFFF', fontStyle: 'Effra', fontSize: '25px', marginBottom: '3px'}}>Мобильное приложение</span>
                                <span style={{color: '#FFFFFF', fontStyle: 'Effra', fontSize: '15px', marginTop: '3px'}}>Доступно на всех платформах</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Main_page