import axios from './axios.js'

export const login = data =>
  axios({
    url: `/api/login`,
    method: 'post',
    data
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

export const showTicket = params =>
  axios({
    url: `/api/tic/showTicket`,
    method: 'get',
    params
  })

export const book = params =>
  axios({
    url: `/api/book`,
    method: 'post',
    params
  })

export const showCheckList = () =>
  axios({
    url: `/api/showCheckList`,
    method: 'get'
  })

export const check = params =>
  axios({
    url: `/api/check`,
    method: 'get',
    params
  })
