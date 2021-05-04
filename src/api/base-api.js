import axios from "axios";

const VOLODYA_KEY = '4dd2451e-4040-4290-a824-e523b24dc956'
const PVY_KEY = '0f09df06-8158-4fd3-ab22-f5fb88226240'

function BaseAPI() {
    const config = {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': PVY_KEY
        }
    }
    this.axios = axios.create(config)
}

BaseAPI.prototype.get = function(url) {
    return this.axios.get(url).then(({ data }) => data)
}

BaseAPI.prototype.post = function(url, jsonObj = {}) {
    return this.axios.post(url, jsonObj).then(({ data }) => data)
}

BaseAPI.prototype.delete = function(url) {
    return this.axios.delete(url).then(({ data }) => data)
}

BaseAPI.prototype.put = function(url, obj = {}) {
    return this.axios.put(url, obj).then(({ data }) => data)
}

BaseAPI.prototype.putFile = async function(url, file) {
    const formData = new FormData()
    formData.append('image', file)
    const { data } = await this.axios.put(url, formData, {
        headers: {
            'API-KEY': PVY_KEY,
            'Content-Type' : 'multipart/form-data'
        }
    })
    return data
}

export default BaseAPI