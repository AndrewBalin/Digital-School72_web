import axios from 'axios'

class ApiTools {
    token = null
    tokenLifetime = null
    constructor() {

        if (CsrfApi._instance) {
            return CsrfApi._instance
        }

        CsrfApi._instance = this
        this.getCsrfToken().then()

    }

    getCsrfToken = async function () {

        let nowTime = Date()

        if (CsrfApi._instance.token && CsrfApi._instance.tokenLifetime < nowTime) {
            return CsrfApi._instance.token
        }

        let tokenInfo = await axios.post('')

        CsrfApi._instance.token = tokenInfo.data.token
        CsrfApi._instance.tokenLifetime = tokenInfo.data.lifeTime

        return CsrfApi._instance.token

    }

    setCsrfToken = async function (fn) {

        let token = await CsrfApi._instance.getCsrfToken()

        return function (...args) {
            return fn(...args, csrf=token)
        }

    }

}