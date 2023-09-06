import React from 'react'
import styles from './menu.module.scss'
import {Alert, Skeleton, Snackbar, Tooltip} from '@mui/material'
import Router from 'next/router'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Image from 'next/image'
import Consts from '../../../lib/consts'

class RightMenu extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            menuVisible: props.visible,
            messagesOn: false,
            copyTime: false,
            token: props.token,
            loading: true,
        }

        this.url = Consts.url

    }

    setMenu = () => {
        this.props.userSet()
    }

    url = Consts.url

    copyNick = () => {
        navigator.clipboard.writeText(this.state.nickname)
        this.setState({copyTime: true})
    }

    getData = (Profile) => {
        if (this.props.token) {

            let reg = Profile.getData(this.props.token)
            reg.then(o => {
                if (o.state === 'ok') {
                    this.setState({
                        nickname: '@' + o.nickname,
                        name: o.name,
                        image: Consts.url + '/avatar_' + this.state.token
                    })

                    let reg = Profile.getNotifications(this.props.token)
                    reg.then(o => {
                        if (o.state === 'ok') {
                            this.setState({
                                notifications: o.notifications,
                            })
                            setTimeout(() => this.setState({loading: false}), 100)
                        }
                    })
                }
            })
        }
    }

    render() {

        return (
            this.props.visible
                ? <div className={styles.rightMenu} id={styles['rightMenu']}>
                    <ChevronRightIcon
                        style={{fontSize: 60, marginLeft: 0, marginRight: 'auto', color: 'rgba(0, 0, 0, 0.5)'}}
                        onClick={this.setMenu}/>
                    {
                        this.state.loading
                        ? <div style={{width: '130px', height: '130px'}}>
                            <Skeleton variant='circular' height='100%' width='100%' animation='wave'/>
                        </div>
                        : <div className={styles.userImage} onClick={this.requestTest}>
                        <Image src={this.state.image} style={{borderRadius: '50%'}} layout='fill'/>
                        </div>
                    }

                    <span className={styles.username}>
                        {
                            this.state.loading
                                ? <div style={{width: '200px'}}><Skeleton height='35px' animation='wave'/></div>
                                : this.state.name
                        }

                    </span>
                    <Tooltip title="Копировать никнейм" arrow>
                        <span className={styles.nickname} onClick={this.copyNick}>
                            {
                                this.state.loading
                                ? <div style={{width: '150px'}}><Skeleton height='25px' animation='wave'/></div>
                                : this.state.nickname

                            }
                        </span>
                    </Tooltip>
                    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.copyTime}
                              autoHideDuration={3000} onClose={() => this.setState({copyTime: false})}>
                        <Alert onClose={this.copyNick} severity="success">
                            Никнейм успешно скопирован
                        </Alert>
                    </Snackbar>
                    <div className={styles.eventsBlock}>
                        <div className={styles.eventsAction}>
                            <span>Новые сообщения</span>
                            <span
                                onClick={() => this.setState({messagesOn: !this.state.messagesOn})}>{this.state.messagesOn ? 'Свернуть' : 'Развернуть'}</span>
                        </div>
                        <div>
                            {
                                this.state.loading
                                    ? <div style={{marginTop: '8px', width: '100%', height: '200px'}}><Skeleton
                                        width='100%' height='100%' animation='wave' variant='rounded'/></div>
                                    : <div className={styles.eventsList}
                                           id={this.state.messagesOn ? styles['messagesOn'] : styles['messagesOff']}>
                                        {
                                            !this.state.messagesOn
                                                ? this.state.notifications.slice(0, 3).map(
                                                    event =>
                                                        <div className={styles.eventTile}>
                                                            <div className={styles.eventImage}>
                                                                <Image className={styles.eventImage} width='100%' height='100%' src={this.url + '/photo_' + event.avatar}
                                                                       style={{borderRadius: '50%'}}/>
                                                            </div>
                                                            <div className={styles.eventInfo}>
                                                                <span
                                                                    className={styles.eventFrom}>{event.name} {event.surname}</span>
                                                                <span className={styles.eventTime}>{event.date} назад</span>
                                                            </div>
                                                        </div>
                                                )
                                                : this.state.notifications.map(
                                                    event =>
                                                        <div className={styles.eventTile}>
                                                            <div className={styles.eventImage}>
                                                                <Image className={styles.eventImage} width='100%' height='100%' src={this.url + '/photo_' + event.avatar}
                                                                       style={{borderRadius: '50%'}}/>
                                                            </div>
                                                            <div className={styles.eventInfo}>
                                                                <span
                                                                    className={styles.eventFrom}>{event.name} {event.surname}</span>
                                                                <span className={styles.eventTime}>{event.date} назад</span>
                                                            </div>
                                                        </div>
                                                )
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                    <div className={styles.eventsBlock}>
                        <div className={styles.eventsAction}>
                            <span>Ваши закладки</span>
                            <span>Развернуть</span>
                        </div>
                    </div>
                </div>
                : <div className={styles.rightMenuButton}><ChevronLeftIcon
                    style={{fontSize: 60, marginLeft: 0, marginRight: 'auto', color: 'rgba(0, 0, 0, 0.5)'}}
                    onClick={this.setMenu}/></div>


        )
    }

    componentDidMount() {

        import ('../../../lib/getDataFromServer').then((module) => {
            this.setState({Profile: module.default})
            this.getData(module.default)
            setTimeout(() => {}, 1000)
        })

    }

}

export default RightMenu
