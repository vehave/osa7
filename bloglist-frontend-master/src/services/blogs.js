import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const ereaseToken = () => {
  token = null;

}

const create = async newObject => {
  const config = {    
    headers: { Authorization: token },  
  }
  const response = await axios.post(baseUrl, newObject, config)  
  return response.data
}

const deleteBlog = id => {
  const config = {    
    headers: { Authorization: token },  
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const update = (id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog)
  return request.then(response => response.data)
}

const comment = (id, comment) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, comment)
  return request.then(response => response.data)
}


export default { getAll, setToken, ereaseToken, create, deleteBlog, update, comment }