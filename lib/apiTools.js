import axios from 'axios'

class ApiTools {

    url = 'http://158.160.106.122:8000'
    tokenLifetime = null
    status = null
    token = null

    constructor() {
        console.log(ApiTools._instance)

        if (ApiTools._instance) {
            return ApiTools._instance
        }
        ApiTools._instance = this
    }

    async post (url, body) {

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
    getCsrfToken = function () {

        if (ApiTools._instance.token) {
            return ApiTools._instance.token
        }
        try {
            axios.get(ApiTools._instance.url + '/api/get_csrf_token').then(
                response => {
                    console.log(response.data)
                    ApiTools._instance.status = {'status': true}
                    ApiTools._instance.token = response.data
            })
            return ApiTools._instance.token
        } catch {
            ApiTools._instance.status = {'status': false, 'error': 'Проблема с доступом к серверу'}
            return null
        }

    }

    getStatus() {
        return ApiTools._instance.status
    }


    // Not using!!!
    setCsrfToken = async function (fn) {

        let token = await ApiTools._instance.getCsrfToken()

        return function (...args) {
            return fn(...args, csrf=token)
        }

    }

}

export default ApiTools