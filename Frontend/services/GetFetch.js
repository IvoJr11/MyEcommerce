import {parseCookies} from 'nookies'

export const getTransactions = async (username) => {
  const cookies = parseCookies()
  console.log(cookies)
  const token = cookies.acc_tkn
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-methods': '*',
    },
  };
  const data = fetch(`http://localhost:8080/api/transaction/getAll?username=${username}`, config)
    .then((response) => {
      if(!response.ok) {
        return Promise.reject(response)
      }
      return response.json()
    })
    .then(responseJson => {
      console.log(responseJson)
      return responseJson
    })
    .catch((error) => {
      const failedFetch = error.json().then(json => {
        console.log(error.status + " - " + json.error_message)
        return {
          status: error.status,
          message: json.error_message
        }
      })
      return failedFetch
    })

  return data
} 