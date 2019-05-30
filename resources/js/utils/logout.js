import axios from 'axios'
import setAuthorizationToken from './setAuthorizationToken'

export default (logout) => {

  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('count')

  axios.post('/api/auth/logout').then(res => {
    setAuthorizationToken(null)
    logout()
  }).catch(err => {
    if(err.response){
      if(err.response.status === 400){
        setAuthorizationToken(null)
        logout()
      }
    }else{
      console.log(err)
    }
  })

}
