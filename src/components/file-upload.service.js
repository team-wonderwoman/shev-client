import * as axios from 'axios'

const BASE_URL = 'http://192.168.0.24:8000/api'

function upload (formData) {
  const url = `${BASE_URL}/files/upload/`
  return axios.post(url, formData, {
  	headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then(x => x.data)
    .then(x => x.map(file => Object.assign({},
      file, { url: `${BASE_URL}/files/${file.id}` })))
}

export { upload }
