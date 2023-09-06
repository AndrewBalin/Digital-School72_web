import React from 'react'
import styles from './my_class.module.scss'
import {Menu, MenuItem, Skeleton} from '@mui/material'
import StudentBlock from '../widgets/my_class/student_block.js'
import Image from 'next/image'
import Consts from '../../../lib/consts'

class MyClass extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            block1: 'normal',
            students: [],
            teacher: {},
            mainWidth: props.rightMenu ? props.width - 570 : props.width - 270,
            token: props.token,
            studentMenu: false,
            loading: true,
        }
        this.mainBlock = React.createRef()
        this.url = Consts.url
    }

    teacherBlock = ({teacher}) => {
        if (this.state.loading) {
            return (
                <Skeleton className={this.getMainWidth() < 1210 ? styles.smallSkeleton : styles.bigSkeleton} style={this.getMainWidth() < 1210 ? {height: '165px', borderRadius: '10px'} : {height: '355px', borderRadius: '10px'}} variant="rounded" animation="wave"/>
            )
        }
        return (
            <div className={styles.teacherBlock}
                 style={this.state.mainWidth < 1210 ? {
                         width: '165px',
                         minWidth: '165px',
                         height: '165px',
                         borderRadius: '10px',
                         position: 'relative',
                     }
                     : {position: 'relative'}}>
                <Image style={{borderRadius: '9px'}} src={this.url + teacher.avatar} layout='fill'/>
                <div className={styles.teacherDescription}
                     style={this.state.mainWidth < 1210
                         ? {height: '50px'}
                         : {height: '70px'}}>
                    <span
                        className={styles.teacherName}>{teacher.surname} {this.state.mainWidth < 1210 ? teacher.shortname : teacher.name}</span>
                    <div className={styles.teacherNick}>
                        {
                            this.state.mainWidth >= 1210 &&
                            <span>Классный руководитель</span>
                        }
                        <span>@{teacher.nickname}</span>
                    </div>
                </div>
            </div>
        )
    }


    getData = (Profile) => {
        if (this.state.token) {

            Profile.getClass(this.state.token).then(o => {
                if (o.state === 'ok') {
                    console.log(o)
                    this.setState({
                        students: o.students,
                        teacher: o.classroomTeacher,
                        count: o.count,
                        school: o.school,
                        classNum: o.number,
                        classLit: o.litera,
                        meanMark: o.meanMark,
                    })
                    setTimeout(() => this.setState({loading: false}), 100)
                }
            })
        }

    }


    render() {
        return (
            <div className={styles.main} ref={this.mainBlock}>
                <div className={styles.center}>
                    <div className={styles.classInfo}
                         style={
                             this.state.mainWidth >= 1210
                                 ? {width: `${this.state.mainWidth - ((this.state.mainWidth - 380) % 190) - 25}px`}
                                 : {width: `${this.state.mainWidth - ((this.state.mainWidth - 190) % 190) - 25}px`}
                         }>
                        <this.teacherBlock teacher={this.state.teacher}/>
                        {
                            this.state.loading
                            ? <Skeleton className={styles.classInfo1} id={styles['infoBlock']} style={{height: '165px', borderRadius: '10px'}} variant="rounded" animation="wave"/>
                                :
                                <div className={styles.classInfo1} id={styles['infoBlock']}>
                                    <div className={styles.textBlock}><span
                                        className={styles.infoText1}>{this.state.count}</span>
                                        <span className={styles.infoText2}>учеников</span></div>
                                    <div className={styles.textBlock}><span className={styles.infoText1}>12</span>
                                        <span className={styles.infoText2}>предметов</span></div>
                                </div>
                        }
                        {
                            this.state.loading
                                ? <Skeleton className={styles.classInfo2} id={styles['infoBlock']} style={{height: '165px', borderRadius: '10px'}} variant="rounded" animation="wave"/>
                                :
                                <div className={styles.classInfo2} id={styles['infoBlock']}>
                                    <div className={styles.textBlock}><span
                                        className={styles.infoText1}>{this.state.school}</span>
                                        <span className={styles.infoText2}>школа</span></div>
                                    <div className={styles.textBlock}><span
                                        className={styles.infoText1}>{this.state.classNum}{this.state.classLit}</span>
                                        <span className={styles.infoText2}>класс</span></div>
                                </div>
                        }
                        {
                            this.state.loading
                                ? <Skeleton className={styles.classInfo3}  id={styles['infoBlock']} style={{height: '165px', borderRadius: '10px'}} variant="rounded" animation="wave"/>
                                :
                                <div className={styles.classInfo3} id={styles['infoBlock']}>
                                    <div className={styles.textBlock}><span
                                        className={styles.infoText1}>{this.state.meanMark}</span>
                                        <span className={styles.infoText2}>с.балл</span></div>
                                </div>
                        }
                    </div>
                    <div className={styles.students}
                         style={
                             this.state.mainWidth >= 1210
                                 ? {width: `${this.state.mainWidth - ((this.state.mainWidth - 380) % 190) - 25}px`}
                                 : {
                                     width: `${this.state.mainWidth - ((this.state.mainWidth - 190) % 190) - 25}px`,

                                 }
                         }>
                        {
                            this.state.loading
                            ? [1, 2, 3, 4, 5].map(
                                i => {
                                    console.log(`${i} - ${this.state.mainWidth}`)

                                    return (
                                        <Skeleton className={styles.smallSkeleton} style={{
                                            marginLeft: this.getMainWidth() >= 1210 && i === 1 ? '380px' : '0',
                                            width: '165px',
                                            minWidth: '165px',
                                            height: '165px',
                                            borderRadius: '10px',}} variant="rounded" animation="wave"/>
                                    )
                                }
                                )


                            : this.state.students.map(
                                (student, id) => {
                                    return (
                                        <StudentBlock student={student}
                                                      id={this.state.mainWidth < 1210 ? styles['student_card'] : id === 0 ? styles['student_card_min'] : styles['student_card']}
                                                      num={id}/>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    updateDimensions = () => {
        setTimeout(this.getMainWidth, 50)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions)

        import ('../../../lib/getDataFromServer').then((module) => {
            this.setState({Profile: module.default})
            this.getData(module.default)
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)


    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({mainWidth: nextProps.rightMenu ? nextProps.width - 570 : nextProps.width - 330})
        this.updateDimensions()
    }
    getMainWidth = () => {
        //console.log(this.mainBlock.current.getBoundingClientRect().width - ((this.mainBlock.current.getBoundingClientRect().width - 380) % 190))
        if (this.mainBlock.current) {
            console.log('update width: ' + this.mainBlock.current.getBoundingClientRect().width)
            //this.setState({mainWidth:  this.mainBlock.current.getBoundingClientRect().width})
            return this.mainBlock.current.getBoundingClientRect().width
        }
    }
}

export default MyClass
