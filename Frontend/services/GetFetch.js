import {parseCookies} from 'nookies'

export const getTransactions = async (username) => {
  const cookies = parseCookies()
  const token = cookies.acc_tkn
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-methods': '*',
    },
  };

  try {
    const response = await fetch(`http://localhost:8080/api/transaction/getAll?username=${username}`, config)
    const body = await response.json()
    return body
  } catch (error) {
    console.log(error);
  }
} 