import axios from 'axios'
import Cookies from 'js-cookie'
const client = axios.create({baseURL : 'https://api.lesalon.gomaplus.tech/api'})
export const  request = async ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer ${Cookies.get('_kitchen_le_salon_token')}`
    return client(options)
    .then((res) => res)
}

export const imageBaseURL = 'https://api.lesalon.gomaplus.tech'