import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import styles from '../styles/Home.module.css'

import loginFetch from '../services/LoginFetch'
import { useRouter } from "next/router"

// import Logo from '../public/LogoPackage/logo_transparentv2.png'
import Logo from '../public/ModerLogoPack/logo(2).png'
import { Formik } from "formik"
// import Logo from '../public/ModerLogoPack/logo_transparent(2).png'

export default function Login() {
  const router = useRouter()

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   await loginFetch(username, password)
  //     .then(()=> router.push('/home'))
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>Homebanking</title>
      </Head>

      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={({username, password, setErrors}) => {
          // console.log(values)
          return loginFetch(username, password)
            .catch((error) => {
              setErrors('username', error)
            })
        }}
      >
        {
          ({errors, handleChange, handleSubmit, isSubmitting}) => {
            return <form onSubmit={handleSubmit} className={styles.loginForm}>
              <Image style={{borderRadius: '45px'}} src={Logo} alt='logo' width={100} height={100} />
              <div style={{ margin: '5px 0 35px', textAlign: 'center'}}>
                <h1 style={{ fontWeight: 'initial', fontSize: '30px'}}>Welcome back</h1>
                <p style={{fontSize: '15px', color: 'rgb(114, 114, 114)'}}>Enter your credentials to login.</p>
              </div>
              <input name='username' onChange={handleChange} type='email' placeholder='Email' className={styles.loginInputs} />
              <input name='password' onChange={handleChange} type='password' placeholder='Password' className={styles.loginInputs} />
              <button type='submit' className={styles.loginButton}>Login</button>
              <span style={{color: 'red'}}>
                {
                  console.log(errors)

                }
              </span>
              <small style={{marginTop: '10px'}}>You don&apos;t have a account? <Link href='/register' className={styles.signInText} >Sing in</Link></small>
            </form>
          }
        }
      </Formik>
      {/* <Navbar /> */}
    </div>
  )
}


{/* <form onSubmit={handleSubmit} className={styles.loginForm}>
              <Image style={{borderRadius: '45px'}} src={Logo} alt='logo' width={100} height={100} />
              <div style={{ margin: '5px 0 35px', textAlign: 'center'}}>
                <h1 style={{ fontWeight: 'initial', fontSize: '30px'}}>Welcome back</h1>
                <p style={{fontSize: '15px', color: 'rgb(114, 114, 114)'}}>Enter your credentials to login.</p>
              </div>
              <input type='email' placeholder='Email' onChange={handleUsername} className={styles.loginInputs} />
              <input type='password' placeholder='Password' onChange={handlePassword} className={styles.loginInputs} />
              <button className={styles.loginButton} >Login</button>
              <small style={{marginTop: '10px'}}>You don&apos;t have a account? <Link href='/register' className={styles.signInText} >Sing in</Link></small>
            </form> */}