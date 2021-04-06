import axios from 'axios'
const baseUrl = '/api/login'

const getLogin = async credentials => {
  const response = await axios.post(baseUrl,credentials)
  return response.data
}

const logger = {
  getLogin
}

export default logger