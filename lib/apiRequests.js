import axios from 'axios'

class ApiTools {

    url = ''
    token = null
    tokenLifetime = null
    constructor() {

        if (ApiTools._instance) {
            return ApiTools._instance
        }

        ApiTools._instance = this
        this.getCsrfToken().then()

    }

    post = async function (url, body){

        url = ApiTools._instance.url + url
        let headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': ApiTools._instance.getCsrfToken()
        }

        let data = await axios.post(
            ApiTools._instance.url + url,
            body,
            {headers: headers})

        return data.data

    }

    // Not using!!!
    /*get = async function (url, body) {

        url = ApiTools._instance.url + url
        let headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': ApiTools._instance.getCsrfToken()
        }



        let data = await axios.get(
            ApiTools._instance.url + url,
            body,
            {headers: headers})

        return data.data

    }*/
    getCsrfToken = async function () {

        let nowTime = Date()

        if (ApiTools._instance.token && ApiTools._instance.tokenLifetime < nowTime) {
            return ApiTools._instance.token
        }

        let tokenInfo = await axios.post(
            ApiTools._instance.url + '/api/get_csrf_token'
        )

        ApiTools._instance.token = tokenInfo.data.token
        ApiTools._instance.tokenLifetime = tokenInfo.data.lifeTime

        return ApiTools._instance.token

    }


    // Not using!!!
    setCsrfToken = async function (fn) {

        let token = await ApiTools._instance.getCsrfToken()

        return function (...args) {
            return fn(...args, csrf=token)
        }

    }

}