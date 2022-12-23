import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import styles from '../styles/Home.module.css'

import loginFetch from '../services/LoginFetch'
import { useRouter } from "next/router"

import Logo from '../public/ModerLogoPack/logo(2).png'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validateFields = values => {
  const errors = {}

  if(!values.username) {
    errors.username = 'Required username'
  }

  if(!values.password) {
    errors.password = 'Required password'
  }

  return errors
}

export default function Login() {
  const router = useRouter()
  
  const handleSubmit = (values, {setFieldError}) => {
    return loginFetch(values.username, values.password)
    .then(() => router.push('/home'))
    .catch((error) => {
        setFieldError('username', error)
      })
  }

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
        validate={validateFields}
        onSubmit={handleSubmit}
      >
        {
          ({errors, isSubmitting}) => {
            return <Form className={styles.loginForm}>
              <Image style={{borderRadius: '45px'}} src={Logo} alt='logo' width={100} height={100} />
              <div style={{ margin: '5px 0 35px', textAlign: 'center'}}>
                <h1 style={{ fontWeight: 'initial', fontSize: '30px'}}>Welcome back</h1>
                <p style={{fontSize: '15px', color: 'rgb(114, 114, 114)'}}>Enter your credentials to login.</p>
              </div>
              <Field name='username' type='email' placeholder='Email' className={styles.loginInputs} />
              <ErrorMessage  name='username'>
                {msg => <p style={{color: 'red'}}>{msg}</p>}
              </ErrorMessage>
              <Field name='password' type='password' placeholder='Password' className={styles.loginInputs} />
              <ErrorMessage  name='password'>
                {msg => <p style={{color: 'red'}}>{msg}</p>}
              </ErrorMessage>
              <button type='submit' className={styles.loginButton}>Login</button>
              <small style={{marginTop: '10px'}}>You don&apos;t have a account? <Link href='/register' className={styles.signInText} >Sing in</Link></small>
            </Form>
          }
        }
      </Formik>
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