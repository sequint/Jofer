import axios from 'axios'

const ItemAPI = {
  create: item => axios.post('/api/items', item, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  update: (id, updates) => axios.put(`/api/items/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  delete: id => axios.delete(`/api/items/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export default ItemAPI
