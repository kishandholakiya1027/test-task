import axios from "axios"
export const api = (url: any, method: any, data: any = null) => {
  const Instanse: any = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
  })
  const config: any = {
    url,
    method,
    data,
    // headers: {
    //   'Authorization': `Bearer ${token}`
    // },
  }
  return Instanse.request(config)
}