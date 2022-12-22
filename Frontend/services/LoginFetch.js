import { setCookie } from "nookies"

export default async function LoginFetch(username, password) {
  const data = new URLSearchParams ({
    'username': username,
    'password': password
  })
  const response = await fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Accept': 'application/json',
    },
    body: data
  })
    .then(res => {
      console.log(res)
      if(!res.ok) {
        return Promise.reject(res)
      }
      return res.json()
    })
    .then(data => {
      console.log(data)
      setCookie(null, 'acc_tkn', data.access_token, {
        maxAge: 30*24*60*60,
        path: '/',
      })
      setCookie(null, 'rfsh_tkn', data.refresh_token, {
        maxAge: 30*24*60*60,
        path: '/',
      })
    })
    .catch((error) => {
      console.log(error)
      const failedFetch = error.json().then(json => {
        console.log(error.status + " - " + json.error_message)
        return {
          status: error.status,
          message: json.error_message
        }
      })
      return failedFetch
    })
  
  return response
}
