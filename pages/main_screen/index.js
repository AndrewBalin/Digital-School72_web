import React from 'react'
import TopMenu from './widgets/top_menu'
import LeftMenu from './widgets/left_menu'
import RightMenu from './widgets/right_menu'
import {getCookie} from 'cookies-next'
import Router from 'next/router'
import MyClass from './screens/my_class'
import General from './screens/general'
import TEST from './screens/TEST'
import {CircularProgress} from '@mui/material'
//import OnlineLesson from './screens/online_lesson'
//import VideoConference from '../lessons/video_conference'

class MainScreen extends React.Component {


    constructor(props) {
        super(props)

        let token
        let password

        if (props.router) {
            token = props.router.query.token
            this.setState({token: token})
        } else if (getCookie('userData')) {
            token = JSON.parse(getCookie('userData')).token
            password = JSON.parse(getCookie('userData')).password
            this.setState({token: token})
        } else {
            this.setState({page: 'ok'})
        }

        this.state = {
            page: 'Главная',
            rightMenuDisplay: true,
            userSet: false,
            'token': token,
            'password': password,
            update: false,
            loading: true,
        }

    }

    getPermissions = (Profile) => {
        if (this.state.token) {

            let permissions = Profile.getPermissions(this.state.token)
            permissions.then(o => {
                if (o.state === 'ok') {
                    this.setState({
                        'permissions': o.permissions,
                    })
                    setTimeout(() => this.setState({loading: false}), 100)
                }
            })
        }
    }

    CenterScreen = ({screenName, token}) => {
        let centerElement
        switch (screenName) {
            case 'Главная':
                centerElement = <General/>
                break
            case 'Мой класс':
                centerElement = <MyClass token={token} rightMenu={this.state.rightMenuDisplay} width={this.state.width} update={this.state.update}/>
                break
            /*case 'Онлайн уроки':
                centerElement = <OnlineLesson/>
                break
            case 'Тест виджетов':
                centerElement = <VideoConference changePage={this.changePage} token={this.state.token} password={this.state.password}/>
                break*/
            default:
                centerElement = <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}><span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontFamily: 'Effra', fontSize: '50px', textAlign: 'center', color: '#181C2D'}}>Упс, пока что эта страница находится в разработке, но совсем скоро будет доступна</span></div>
                break

        }
        return(
            <div style={{width: '100%'}}>
                {centerElement}
            </div>

        )
    }

    changePage = (value) => {
        this.setState({page: value})
        setTimeout(() => this.setState({update: !this.state.update}), 50)
    }

    changeMenuVisible = () => {
        this.setState({userSet: true, rightMenuDisplay: !this.state.rightMenuDisplay})
    }

    getData = () => {

        let token

        if (this.props.router) {
            token = this.props.router.query.token
            this.setState({token: token})
        } else if (getCookie('userData')) {
            token = JSON.parse(getCookie('userData')).token
            this.setState({token: token})
        } else {
            this.setState({page: 'ok'})
        }

    }

    render() {

        if (this.state.loading) {
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress/>
                </div>

            )
        }

        else {
            switch (this.state.permissions) {
                case 0:
                    return (
                        <span>Базовая страница</span>
                    )
                case 1:
                    return (
                        <div style={{maxWidth: '100vw', overflow: 'hidden'}}>
                            <TopMenu/>
                            <div style={{display: 'flex'}}>
                                <LeftMenu active={this.state.page} changePage={this.changePage}/>
                                <div style={{width: '100%'
                                }}>
                                    <this.CenterScreen screenName={this.state.page} token={this.state.token}/>
                                </div>
                                <RightMenu visible={this.state.rightMenuDisplay} userSet={this.changeMenuVisible} token={this.state.token}/>
                            </div>
                        </div>
                    )
                case 2:
                    return (
                        <span>Страница учителя</span>
                    )
                case -1:
                    return (
                        <span>СУПЕР-СТРАНИЧКА АДМИНА</span>
                    )
            }
        }
    }

    getMainWidth = () => {
        let width = window.innerWidth

        this.setState({width: width})

        if (width < 1510 && !this.state.userSet) {
            this.setState({rightMenuDisplay: false})
        } else if (width >= 1510 && !this.state.userSet) {
            this.setState({rightMenuDisplay: true})
        }

    }

    /*static async getInitialProps({ res }) {
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
        return {}
    }*/
    updateDimensions = () => {
        this.getMainWidth()
    }

    componentDidMount() {

        if (this.state.page === 'ok') {
            Router.replace('./registration')
        }

        import ('../../lib/getDataFromServer').then((module) => {
            this.setState({Profile: module.default})
            this.getPermissions(module.default)
        })

        window.addEventListener('resize', this.updateDimensions)
        this.getMainWidth()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

}

export default MainScreen