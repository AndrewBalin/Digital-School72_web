import React from 'react'
import styles from './main_page.module.css'
import Image from 'next/image'
import Router from 'next/router'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined'
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import Link from "next/link"
import style from './main_page.module.css'

class Main_page extends React.Component {

    render() {
        return(
            <div className={style.mainbg}>
                <div className={style.header}>
                    <span className={style.label}>Цифровая Школа</span>
                    <span className={style.outlineButtonText} onClick={() => Router.push('./registration')}>Регистрация</span>
                    <div className={style.button} onClick={() => Router.push('./registration/login')}>
                        <span>Вход</span>
                    </div>
                </div>
                <div className={style.page}>
                    <div className={style.main}>
                        <div className={style.action}>
                            <div className={style.opg}>
                                <div className={style.rec}>
                                    <div className={style.rec1}/>
                                    <div className={style.rec2}/>
                                    <div className={style.rec3}/>
                                </div>
                                <div className={style.op} lang='ru'>
                                    <span className={style.text1}>Новая эра электронного образования<br/></span>
                                    <span className={style.text2}>Наш электронный дневник, призванный облегчить жизнь всем участникам учебного процесса, уже доступен для <b>альфа тестирования</b>! Станьте участниками теста совершенно бесплатно!</span>
                                </div>
                            </div>
                            <div className={style.buttonsAc1}>
                                <div className={style.button1Ac1} onClick={() => Router.push('./registration')}><span style={style.buttonTextAc1}>Регистрация</span></div>
                                <div className={style.button2Ac1} onClick={() => window.open('https://vk.com/digitalschool72', "_blank")}><span style={style.buttonTextAc1}>Подробнее</span></div>
                            </div>
                        </div>
                        <div className={style.action2}>
                            <Image src={require('../assets/img6.png')} className={style.action2}/>
                        </div>
                    </div>
                </div>

                <div className={style.page}>
                    <div className={styles.main2}>
                        <span className={style.text3}>Наши функции</span>
                        <div className={styles.carousel}>
                            <div className={style.carouselBlock}>
                                <Image src={require('../assets/img1.png')}/>
                            </div>
                            <div className={style.carouselBlock}>
                                <Image src={require('../assets/img2.png')}/>
                            </div>
                            <div className={style.carouselBlock}>
                                <Image src={require('../assets/img3.png')}/>
                            </div>
                            <div className={style.carouselBlock}>
                                <Image src={require('../assets/img4.png')}/>
                            </div>
                            <div className={style.carouselBlock}>
                                <Image src={require('../assets/img5.png')}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.page}>
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
                    <div className={style.circleMain}>
                        <div className={style.circle1}>
                            <div className={style.circle2}>
                                <div className={style.circle3}>
                                    <div className={style.circleImg}>
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