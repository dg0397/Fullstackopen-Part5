import axios from 'axios'
const baseUrl = '/api/blogs'
let token;

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers : { Authorization : token}
  }
  const request = await axios.post(baseUrl,blog,config)
  return request.data
} 

const update = async (blog) => {
  console.log(blog)
  const request = await axios.put(`${baseUrl}/${blog.id}`,blog)
  return request.data
}

const deleteBlog = async (id) => {
  const config = {
    headers : { Authorization : token}
  }
  const request = await axios.delete(`${baseUrl}/${id}`,config)
  return request.data
}

const blogServices = {
  getAll,
  setToken,
  create,
  update,
  deleteBlog
}

export default blogServices