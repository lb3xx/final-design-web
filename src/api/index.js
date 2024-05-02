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

export const book = data =>
  axios({
    url: `/api/book`,
    method: 'post',
    data
  })

export const showCheckList = () =>
  axios({
    url: `/api/showCheckList`,
    method: 'get'
  })

export const check = data =>
  axios({
    url: `/api/check`,
    method: 'post',
    data
  })

export const updatePerformanceList = data =>
  axios({
    url: `/api/per/updatelist`,
    method: 'post',
    data
  })

  export const deletePer = params =>
  axios({
    url: `/api/per/deleteperformance`,
    method: 'get',
    params
  })

  export const deleteTicketById = data =>
  axios({
    url: `/api/delete`,
    method: 'post',
    data
  })

  export const search = params =>
  axios({
    url: `/api/per/showbykeyword`,
    method: 'get',
    params
  })
