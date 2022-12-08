import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"

import styles from '../styles/Home.module.css'

import Logo from '../public/LogoPackage/logo_transparentv2.png'
import loginFetch from '../services/LoginFetch'
import { useRouter } from "next/router"

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const router = useRouter()

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await loginFetch(username, password)
      .then(()=> router.push('/home'))
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
        <input type='email' placeholder='Email' onChange={handleUsername} className={styles.loginInputs} />
        <input type='password' placeholder='Password' onChange={handlePassword} className={styles.loginInputs} />
        <button className={styles.loginButton} >Login</button>
        <small style={{marginTop: '10px'}}>You don&apos;t have a account? <Link href='/register' className={styles.signInText} >Sing in</Link></small>
      </form>
      {/* <Navbar /> */}
    </div>
  )
}