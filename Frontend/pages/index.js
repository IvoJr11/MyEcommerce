import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"

import Navbar from "../components/Navbar"
import styles from '../styles/Home.module.css'

import Logo from '../public/HatchfulExport-All/logo_transparentv2.png'

export default function Login() {
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {'email': email, 'password': password}
    const response = await fetch("http://localhost:8080/login", { method: 'POST', mode: 'no-cors', headers: {'Access-Control-Allow-Origin': '*'}, body: JSON.stringify(data)})
      .then( res => {
        console.log(res)
      })

    console.log(response)
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Homebanking</title>
      </Head>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <Image src={Logo} alt='logo' width={80} />
        <div style={{ margin: '5px 0 35px', textAlign: 'center'}}>
          <h1 style={{ fontWeight: 'initial', fontSize: '30px'}}>Welcome back</h1>
          <p style={{fontSize: '15px', color: 'rgb(114, 114, 114)'}}>Enter your credentials to login.</p>
        </div>
        <input type='email' placeholder='Email' onChange={handleEmail} className={styles.loginInputs} />
        <input type='password' placeholder='Password' onChange={handlePassword} className={styles.loginInputs} />
        <button className={styles.loginButton} >Login</button>
        <small style={{marginTop: '10px'}}>You don&apos;t have a account? <Link href='/register' style={{color: '#666CD9'}} >Sing in</Link></small>
      </form>
      {/* <Navbar /> */}
    </div>
  )
}