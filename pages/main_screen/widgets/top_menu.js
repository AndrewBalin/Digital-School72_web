import React from 'react'
import styles from './menu.module.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

class TopMenu extends React.Component {

    render() {
        return(
            <div className={styles.block}>
                <div className={styles.menu}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>цифровая школа</span>
                        <span className={styles.logoNums}>72</span>
                    </div>
                    <div className={styles.decorationMenu}/>
                    <div className={styles.search}>
                        <div className={styles.searchBar}>
                            <SearchOutlinedIcon className={styles.searchIcon} style={{fontSize: '32px'}}/>
                            <span className={styles.searchBarText}>Поиск</span>
                        </div>
                    </div>
                    <div className={styles.decorationMenu}/>
                    <div className={styles.buttons}>
                        <SettingsOutlinedIcon className={styles.icon} style={{fontSize: '32px'}}/>
                        <NotificationsOutlinedIcon className={styles.icon} style={{fontSize: '32px'}}/>
                        <ChatBubbleOutlineIcon className={styles.icon} style={{fontSize: '32px'}}/>
                    </div>
                </div>
                <div className={styles.decorationBottom}/>
            </div>
        )
    }


}

export default TopMenu