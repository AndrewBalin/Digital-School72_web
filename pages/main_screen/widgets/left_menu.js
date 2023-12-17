import React from 'react'
import styles from './menu.module.scss'

class LeftMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            active: props.active
        }
    }

    tiles = ['Главная', 'Мой класс', 'Дневник', 'Оценки', 'Домашняя работа', 'Литература', 'Онлайн уроки', 'Мессенджер', 'Тест виджетов']

    changeActiveTile = (tile) => {
        this.setState({active: tile})
        this.props.changePage(tile)
    }

    render() {
        return(
           <div className={styles.leftMenu}>
               {
                   this.tiles.map(
                       tile =>
                           this.state.active === tile
                               ? <div className={styles.activeTile}><span className={styles.activeTileText}>{tile}</span></div>
                               : <div className={styles.tile} onClick={() => this.changeActiveTile(tile)}><span className={styles.tileText}>{tile}</span></div>
                   )
               }
           </div>
        )
    }

}

export default LeftMenu