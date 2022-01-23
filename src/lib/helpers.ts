import axios from 'axios'

import { API_BASE_URL } from 'data/constants'

axios.defaults.baseURL = API_BASE_URL

export const fetcher = async <T>(url: string) => {
  try {
    const res = await axios.get<T>(url)
    return res.data
  } catch (err: any) {
    throw err?.response.data
  }
}
