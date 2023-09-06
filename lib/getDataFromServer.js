//import crypto from 'crypto'
import Consts from './consts'



/*const JSEncrypt = (await import('jsencrypt')).default
class Encryptor {

    constructor() {
        //this.public_key = this.getPublicKey().then(key => {return key})
    }

    encryptionAlgorithm = {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
    }

    stringToArrayBuffer(str) {

        const buffer = new ArrayBuffer(str.length)
        const bufferView = new Uint8Array(buffer)
        for (let i = 0; i < str.length; i++) {
            bufferView[i] = str.charCodeAt(i)
        }
        return buffer

    }

    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    async getPublicKey() {

        let publicKey = await fetch(Profile.url + '/get_key')
        publicKey = await publicKey.text()

        return publicKey

    }

    async encryptData(data) {

        const key = await window.crypto.subtle.generateKey(
            {
                name: 'AES-CBC',
                length: 256
            },
            true,
            ['encrypt', 'decrypt']
        )

        const iv = window.crypto.getRandomValues(new Uint8Array(16))

        const encodeData = await new TextEncoder().encode(data)

        const encryptedBufferData = await window.crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv: iv,
            },
            key,
            encodeData
        )

        const encryptedData = await this.arrayBufferToBase64(encryptedBufferData)

        const keyArrayBuffer = await window.crypto.subtle.exportKey("raw", key)
        console.log(keyArrayBuffer)
        const keyString = await this.arrayBufferToBase64(keyArrayBuffer)

        console.log(iv)
        console.log(keyString)

        return [encryptedData, keyString, iv]

    }
    async encrypt(json) {

        const jsonString = JSON.stringify(json)

        const crypt = new JSEncrypt()
        const pKey = await this.getPublicKey()
        crypt.setPublicKey(pKey)

        const [encryptedData, key, iv] = await this.encryptData(jsonString)

        const encryptedBytes = await crypt.encrypt(key, JSEncrypt.RSA_PKCS1_PADDING)
        const encryptedKey = await encryptedBytes.toString('base64')

        const hash = crypto.createHash('sha256').update(jsonString).digest('hex')

        return {
            'encryptedData': encryptedData,
            'encryptedKey': encryptedKey,
            'iv': iv,
            'hash': hash
        }

    }

}*/

class Profile {

    static url = Consts.url

    constructor() {

    }

    static async test() {

        let data = {
            'token': 'gjfktugjgnv',
            'password': 'kfkorf124'
        }

        const encryptor = new Encryptor()
        data = await encryptor.encrypt(data)

        await fetch(
            this.url + '/test',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            })
    }

    static async registration(school, patronymic, name, surname, email, password, nickname, city) {

        let data = {
            School: school,
            Patronymic: patronymic,
            Name: name,
            Surname: surname,
            Email: email,
            Password: password,
            Nickname: nickname,
            City: city
        }

        /*const encryptor = new Encryptor()
        data = await encryptor.encrypt(data)*/

        return fetch(
            this.url + '/registration.json',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((json) => {
                return json
            })
    }

    static async confirmMail(code, token) {

        let data = {
            Token: token,
            Code: code
        }

        /*const encryptor = new Encryptor()
        data = await encryptor.encrypt(data)*/

        return fetch(
            this.url + '/confirm_mail.json',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((json) => {
                return json
            })
    }


    static async cookieLogin(token, password) {

        let data = {
            Token: token,
            Password: password
        }

        /*const encryptor = new Encryptor()
        data = await encryptor.encrypt(data)*/

        return fetch(
            this.url + '/cookie_login.json',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((json) => {
                return json
            })
    }

    static async login(login, password) {

        let data = {
            Login: login,
            Password: password
        }

        /*const encryptor = new Encryptor()
        data = await encryptor.encrypt(data)*/

        return fetch(
            this.url + '/login.json',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((json) => {
                return json
            })
    }

    static async getData(token) {

        let data = {
            Token: token
        }

        /*const encryptor = new Encryptor()
        data = await encryptor.encrypt(data)*/

        return fetch(
            this.url + '/get_main_data',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((json) => {
                return json
            })
    }

    static async getClass(token) {

        let data = {
            Token: token
        }

        /*const encryptor = new Encryptor()
        data = await encryptor.encrypt(data)*/

        return fetch(
            this.url + '/get_class_data',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then(json => {
                return json
            })
    }

    static async getCities() {

        return fetch(
            this.url + '/get_city_list',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((json) => {
                return json
            })
    }

    static async getSchools(city) {

        const data = {
            City: city
        }

        return fetch(
            this.url + '/get_school_list',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then(json => {
                return json
            })
    }

    static async getPermissions(token) {

        const data = {
            Token: token,
        }

        return fetch(
            this.url + '/get_permissions',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then(json => {
                return json
            })
    }

    static async getEvent() {

        return fetch(
            this.url + '/get_school_event',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then(json => {
                return json
            })
    }

    static async getNotifications(token) {

        const data = {
            Token: token,
        }

        return fetch(
            this.url + '/get_notifications',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then(json => {
                return json
            })
    }

    static async sendForm(data) {

        await fetch(
            this.url + '/send_form',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

    }
}

export default Profile