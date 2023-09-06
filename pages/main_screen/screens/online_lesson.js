import React from 'react'
//import Conference from '../../lessons/base_conf'

class OnlineLesson extends React.Component {

    newConference() {

        //let conference = new Conference({token: '9dHPWJwcWYP7cO8pPDxW', members: [], name: 'Test2', theme:'Test2', subject: 'Test2'})
        console.log('1')



    }

    render() {
        return(
            <button onClick={() => this.newConference()}>Новая конференция</button>
        )
    }

}

export default OnlineLesson