import React, {useEffect} from 'react'
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {CheckOutlined} from "@mui/icons-material";

function VideoInputSelector({mainDevices, setMainDevice}) {

    const [menu, setMenu] = React.useState(null)
    const [videoInputDevices, setVideoInputDevices] = React.useState([])
    //const [devices, setDevices] = React.useState([])

    useEffect(() => {

        navigator.mediaDevices.enumerateDevices().then(device => {
            setVideoInputDevices(device.filter(
                device => device.kind === 'videoinput'))
        })


    }, [mainDevices])

    const open = Boolean(menu)

    const handleClick = (event) => {
        setMenu(event.currentTarget)
    }

    const handleClose = () => {
        setMenu(null)
    }

    /*const getDevices = async () => {
        return await navigator.mediaDevices.enumerateDevices().then(device => {return device})
    }*/
    //const devices = await navigator.mediaDevices.enumerateDevices().then(device => {return device})
    //console.log(devices)

    /*setVideoInputDevices(devices.filter(
        device => device.kind === 'videoinput'))*/
    //console.log(videoInputDevices)
    /*const audioInputDevices = devices.filter(
        device => device.kind === 'audioinput')
    const audioOutputDevices = devices.filter(
        device => device.kind === 'audiooutput')*/

    return(
        <div>
            <div
                style={{width: '50px', height: '50px', background: '#1085d0'}}
                aria-controls={open ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <span>Выбрать устройство</span>

            </div>
            <Menu
                id='profile-menu'
                anchorEl={menu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'profile',
                }}>
                {
                    videoInputDevices.map(
                        device => {
                            return (
                                <MenuItem
                                    onClick={() => {
                                        mainDevices.videoIn !== device.deviceId &&
                                        setMainDevice('videoInputDeviceId', device.deviceId)
                                    }}>
                                    {
                                        mainDevices.videoIn === device.deviceId &&
                                        <ListItemIcon>
                                            <CheckOutlined fontSize="small"/>
                                        </ListItemIcon>
                                    }
                                    <ListItemText>{device.label}</ListItemText>
                                </MenuItem>
                            )
                        }
                    )
                }
            </Menu>
        </div>

        )
}

export default VideoInputSelector