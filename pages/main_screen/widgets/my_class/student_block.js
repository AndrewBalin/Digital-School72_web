import styles from '../../screens/my_class.module.scss'
import {
    Backdrop,
    CircularProgress,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography
} from '@mui/material'
import React, {useEffect} from 'react'
import {ContentCopy, ContentCut} from '@mui/icons-material'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import MoveUpOutlinedIcon from '@mui/icons-material/MoveUpOutlined'
import Image from 'next/image'
import Consts from '../../../../lib/consts'

function StudentBlock({id, student, num}) {



    const [menu, setMenu] = React.useState(null)
    const [Profile, setProfile] = React.useState()

    useEffect(() => {
        import ('../../../../lib/getDataFromServer').then((module) => {
            setProfile(new module.default)
        })
    }, [])

    useEffect(() => {console.log(student)}, [student])

    const open = Boolean(menu)

    const handleClick = (event) => {
        setMenu(event.currentTarget)
    }
    const handleClose = () => {
        setMenu(null)
    }

    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false)
    }
    const handleToggle = () => {
        setOpenBackdrop(!openBackdrop)
    }

    const avatar_url = student ? (Consts.url + student.avatar) : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sciencealert.com%2Fscientists-confirm-you-can-communicate-with-your-cat-by-blinking-very-slowly&psig=AOvVaw2oC-08UqPCVHyYC4NamzEM&ust=1670693024077000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCIDS8tKG7fsCFQAAAAAdAAAAABAI'

    return (
        <div>
            <div className={styles.studentBlock}
                 style={{position: "relative"}}
                 id={id}
                 aria-controls={open ? 'profile-menu' : undefined}
                 aria-haspopup="true"
                 aria-expanded={open ? 'true' : undefined}
                 onClick={handleClick}
                 /*style={student && {backgroundImage: 'url(' + Profile.url + student.avatar + ')'}}*/>
                <Image style={{borderRadius: '9px'}} src={avatar_url} layout='fill'/>
                <div className={styles.studentNum}>
                    <span>{num + 1}</span>
                </div>
                <div className={styles.studentDescription}>
                    <span className={styles.studentName}>{student && student.surname} {student && student.name}</span>
                    <span className={styles.studentNick}>@{student && student.nickname}</span>
                </div>

            </div>
            <Menu
                id='profile-menu'
                anchorEl={menu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'profile',
                }}
            >
                <MenuItem
                    onClick={() => {
						if(student){
							navigator.clipboard.writeText(student.nickname)
						}
                        handleClose()
                    }}
                >
                    <ListItemIcon>
                        <ContentCopyOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Ник</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        @{student && student.nickname}
                    </Typography>
                </MenuItem>
                <Divider/>
                <MenuItem
                    onClick={() => {
                        handleClose()
                        handleToggle()
                    }}
                >
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Профиль</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose()
                        handleToggle()
                    }}
                >
                    <ListItemIcon>
                        <MailOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Написать сообщение</ListItemText>
                </MenuItem>
                {/*<Divider/>
                <MenuItem>
                    <ListItemIcon>
                        <DeleteOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Удалить из класса</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <MoveUpOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Переместить ученика</ListItemText>
                </MenuItem>*/}

            </Menu>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={openBackdrop}
                onClick={handleCloseBackdrop}
            >
                <div style={{width: '500px', height: '900px', backgroundColor: '#ffffff', marginTop: '50px'}}></div>
            </Backdrop>
        </div>
    )
}

export default StudentBlock
