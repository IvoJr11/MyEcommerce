import { useState } from "react"

export default function Login() {
  
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    console.log(email, password)
    e.preventDefault()
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type='email' placeholder='email' onChange={handleEmail} />
        <input type='password' placeholder='password' onChange={handlePassword} />
        <button>Login</button>
      </form>
    </div>
  )
}