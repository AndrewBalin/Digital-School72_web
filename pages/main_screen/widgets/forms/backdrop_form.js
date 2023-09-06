import React, {useEffect, useState} from 'react'
import styles from './backdrop_form.module.scss'
import {Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Typography} from '@mui/material'

function BackdropForm() {

    const [subjects, setSubjects] = useState([])
    const [marks, setMarks] = useState('')
    const [additional, setAdditional] = useState([])

    const [Profile, setProfile] = useState()

    useEffect(() => {
        import ('../../../../lib/getDataFromServer').then((module) => {
            setProfile(new module.default)
        })
    }, [])

    const handleSubjectsChange = (event) => {
        const id = event.target.id
        setSubjects((currentParticipants) =>
            currentParticipants.includes(id)
                ? currentParticipants.filter((f) => f !== id)
                : [...currentParticipants, id]
        )
    }

    const handleAdditionalChange = (event) => {
        const id = event.target.id
        setAdditional((currentParticipants) =>
            currentParticipants.includes(id)
                ? currentParticipants.filter((f) => f !== id)
                : [...currentParticipants, id]
        )
    }

    const handleMarkChange = (event) => {
        setMarks(event.target.id)
    }

    const submit = () => {
        if(subjects.length > 0 && marks !== '' && additional.length > 0) {
            Profile.sendForm({subjects: subjects, marks: marks, additional: additional})
        }
    }

    const allSubjects = ['Алгебра', 'Геометрия', 'Русский язык', 'Лтература', 'Физика', 'Химия', 'Информатика', 'История', 'Социология/Обществознание']
    const allMarks = ['5', '4-5', '3-4', '2-3']
    const allAdditional = ['Углублённые технические науки', 'Углублённые социальные науки', 'Робототехника', 'Программирование', 'Музыка', 'Спорт', 'Танцы/Балет', 'Проектная деятельность']

    return (
        <div className={styles.main}>
            <div className={styles.inputFieldGroup}>
                <FormGroup>
                    <span className={styles.inputFieldTitle}>1. Какие предметы интерисуют вас в школе?</span>
                    {
                        allSubjects.map(
                            subject => {
                                return (
                                    <FormControlLabel
                                        control={
                                            <Checkbox id={subject} onChange={handleSubjectsChange}/>
                                        }
                                        label={<Typography style={{color: '#000000'}}>{subject}</Typography>}/>
                                )
                            }
                        )
                    }

                </FormGroup>
            </div>
            <div className={styles.inputFieldGroup}>
                <FormGroup>
                    <span className={styles.inputFieldTitle}>2. Какие оценки вы получаете?</span>
                    <RadioGroup>
                        {
                            allMarks.map(
                                mark => {
                                    return (
                                        <FormControlLabel value={mark} control={<Radio id={mark} onChange={handleMarkChange}/>} label={<Typography style={{color: '#000000'}}>{mark}</Typography>} />
                                    )
                                }
                            )
                        }
                    </RadioGroup>
                </FormGroup>
            </div>
            <div className={styles.inputFieldGroup}>
                <FormGroup>
                    <span className={styles.inputFieldTitle}>3. Есть ли у вас хобби, увлечения помимо школы</span>
                    {
                        allAdditional.map(
                            edu => {
                                return (
                                    <FormControlLabel
                                        control={
                                            <Checkbox id={edu} onChange={handleAdditionalChange}/>
                                        }
                                        label={<Typography style={{color: '#000000'}}>{edu}</Typography>}/>
                                )
                            }
                        )
                    }
                </FormGroup>
            </div>
            <div className={styles.button} onClick={() => submit()}>
                <span>Отправить</span>
            </div>
            <div style={{height: '20px'}}></div>
        </div>
    )

}

export default BackdropForm