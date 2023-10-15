import axios from 'axios'

class ApiTools {

    url = 'http://158.160.106.122:8000/api'
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

    async post (url, body= {}) {

        let request_url = ApiTools._instance.url + url

        let token = await ApiTools._instance.getCsrfToken()

        let headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        }

        console.log(headers)

        let status = {error: false}

        let data = await axios.post(
            request_url,
            body,
            {headers: headers}
        ).then(data => {status = {...status, value: data}}).catch(error => {status = {error: true, value: error}})

        console.log(status)

        return status

    }

    async get (url, params = {}) {

        let request_url = ApiTools._instance.url + url

        let status = {error: false}

        let data = await axios.get(
            request_url,
            params
        ).then(data => {status = {...status, value: data}}).catch(error => {status = {error: true, value: error}})

        console.log(status)

        return status

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

        if (ApiTools._instance.token) {
            return ApiTools._instance.token
        }

        let response = await axios.get(ApiTools._instance.url + '/get_csrf_token')

        console.log(response.data)
        ApiTools._instance.status = {'status': true}
        ApiTools._instance.token = response.data

        return await ApiTools._instance.token

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