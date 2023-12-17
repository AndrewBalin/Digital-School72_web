import React, {useRef} from 'react'
import styles from './general.module.scss'
import {Backdrop, Skeleton} from '@mui/material'
import BackdropForm from '../widgets/forms/backdrop_form'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

class General extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            block1: 'normal',
            loading: true,
            openBackdrop: false,
        }
        this.mainBlock = React.createRef()

    }


    handleCloseBackdrop = () => {
        this.setState({openBackdrop: false})
    }

    handleToggle = () => {
        this.setState({openBackdrop: !this.state.openBackdrop})
    }

    blocks = {
        1: {
            name: 'Успеваемость',
            description: 'Аналитика ваших оценок и работ при помощи искуственного интеллекта.',
        },
        2: {
            name: 'Портфолио',
            description: 'Достижения, грамоты, дипломы. Конкурсы, в которых вы принимали участие, а также школьные проекты.',
        },
        3: {
            name: 'Учебная траектория',
            description: 'Предметы и темы, где вы приуспели больше всего, рекомендации по дальнейшему развитию.',
        },
        4: {
            name: 'Реклама',
            description: 'Статичная реклама, которая помогает поддерживать сервис бесплатным.',
        },

    }


    block = ({block, image, description, onClick}) => {
        return(
            <div className={styles.block2} id={styles[image]} onClick={() => onClick()}>
                <div className={styles.blockDesctiption} id={styles[description]}>
                    <span className={styles.blockNameText}>{this.blocks[block].name}</span>
                    <span className={styles.blockDesctiptionText}>{this.blocks[block].description}</span>
                </div>
            </div>
        )
    }

    getMainWidth = () => {
        return this.mainBlock.current.getBoundingClientRect().width
    }

    /*getData = (Profile) => {

        let reg = Profile.getEvent()
        reg.then(o => {
            if (o.state === 'ok') {
                console.log(o)
                this.setState({
                    event: o.event,
                })
                setTimeout(() => this.setState({loading: false}), 100)
            }
        })
    }*/

    render() {
        return(
            <div className={styles.main} ref={this.mainBlock}>

                <div className={styles.center}>
                    <div className={styles.blocks}>
                        <div className={styles.block1} id={
                            this.state.block1 === 'normal'
                            ? styles['block1Normal']
                            : styles['block1Min']
                        }>
                            <span>
                                {
                                    this.state.loading
                                    ? <h3 style={{width: '500px'}}><Skeleton animation='wave'/></h3>
                                    : this.state.event
                                }
                            </span>
                        </div>
                    </div>
                    <div className={styles.blocks}>
                        <this.block image='img1' block={1} description='description1' onClick={() => this.handleToggle()}/>
                        <this.block image='img2' block={2} description='description2' onClick={() => this.Profile.test()}/>
                    </div>
                    <div className={styles.blocks}>
                        <this.block image='img3' block={3} description='description3'/>
                        <this.block image='img4' block={4} description='description4'/>
                    </div>
                </div>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={this.state.openBackdrop}>
                    <div style={{width: '500px', height: '80%', backgroundColor: '#ffffff', marginTop: '50px', overflowY: 'scroll'}}>
                        <div style={{marginTop: '10px', marginRight: '10px', marginBottom: '10px', display: 'flex'}}>
                            <CloseOutlinedIcon style={{color: 'rgb(1, 1, 1, .5)', fontSize: '40px', marginRight: '0', marginLeft: 'auto'}} onClick={this.handleCloseBackdrop}/>
                        </div>
                        <BackdropForm/>
                    </div>
                </Backdrop>
            </div>
        )
    }

    updateDimensions = () => {
        this.getMainWidth() < 932
            ? this.setState({block1: 'min'})
            : this.setState({block1: 'normal'})
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions)

        this.getMainWidth() < 932
            ? this.setState({block1: 'min'})
            : this.setState({block1: 'normal'})

        /*import ('../../../lib/getDataFromServer').then((module) => {
            this.setState({Profile: module.default})
            //this.getData(module.default)
        })*/

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

}

export default General