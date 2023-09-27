import axios from 'axios'

const getCsrfToken = async function () {

}

const setCsrfToken = async function (fn) {

    token = await...

    return function (...args) {
        return fn(...args, csrf=token)
    }
}