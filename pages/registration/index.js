import React, {useState} from 'react'
import Registration_desktop from './registration_desktop'
import Registration_mobile from './registration_mobile'
import {BrowserView, MobileView} from 'react-device-detect'
import styles from './registration_desktop.module.scss'
import Router from 'next/router'
import Profile from '../../lib/getDataFromServer'
import {Alert, CircularProgress, MenuItem, Select, Snackbar, Tooltip, Autocomplete, TextField} from '@mui/material'
import {getCookie, setCookie} from 'cookies-next'

function Registration() {

    const [MStage, setMStage] = useState('landing')

    function nextStage(stage) {
        setMStage(stage)
    }

    function MobilePage() {
        return <Registration_mobile change={nextStage} stage={MStage}/>
    }

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <BrowserView>
                <Registration_desktop/>
            </BrowserView>
            <MobileView>
                <MobilePage/>
            </MobileView>

        </div>
    )

}

export default Registration