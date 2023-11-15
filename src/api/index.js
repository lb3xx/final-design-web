import axios from './axios.js'

export const login = () =>
  axios({
    url: `/api/login`,
    method: 'get'
  })

export const register = data =>
  axios({
    url: `/api/register`,
    method: 'post',
    data
  })

export const uploadlist = data =>
  axios({
    url: `/api/per/uploadlist`,
    method: 'post',
    data
  })

export const showlist = () =>
  axios({
    url: `/api/per/showlist`,
    method: 'get'
  })

export const showTicket = () =>
  axios({
    url: `/api/tic/showTicket`,
    method: 'get'
  })

export const book = data =>
  axios({
    url: `/api/book`,
    method: 'post',
    data
  })
