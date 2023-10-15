import { useSearchParams } from "react-router-dom"
import {useRouter} from "next/router"
import styles from "./email_confirm.module.css"
import {Alert, CircularProgress, Snackbar} from "@mui/material"
import {SmartCaptcha} from "@yandex/smart-captcha"
import React, {useEffect, useState} from "react"
import ApiTools from "../../lib/apiTools"
import {setCookie} from "cookies-next";

const apiTools = new ApiTools()

function Confirm() {

    const [valid, setValid] = useState('Ожидание подтверждения')

    const router = useRouter()
    let token = router.query.token

    const confirm = async () => {
        let status = await apiTools.get('/register_final_verify/' + token)

        if (status.error === false) {

            /*let userData = {
                token: status.data,
            }*/

            let id = status.value.data.id

            setCookie('userData', {id: id})

            let sec = 10
            let timer = setInterval(() => {
                if (sec === -1)
                    clearInterval(timer)
                    window.close()
                setValid(`Подтверждение пройдено успешно, страница будет автоматически закрыта через ${sec}`)
                sec--
            }, 1000)
            console.log(status.value)

        } else {
            console.log(status.value)
            setValid('Подтверждение не удалось')
        }
    }

    useEffect(() => {
        if (!token)
            setValid('Неверный токен подтверждения, проверьте правильность ввода URL-адреса')
        confirm()
    }, []);

    return(
        <div className={styles.mainbg}>
            <fieldset className={styles.regBox}>
                <legend className={styles.legend}>Подтверждение регистрации</legend>
                <span className={styles.prompt}>{valid}</span>
            </fieldset>
        </div>
    )
}

export default Confirm