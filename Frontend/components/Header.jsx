import Image from 'next/image'

import styles from './Header.module.css'
import logo from '../public/e-commerce-logos_transparent.png'

export default function Header () {
  return (
    <header className={styles.header}>
      <Image style={{borderRadius: '10px'}} src={logo} alt='logo' width={85} height={85} />
      <input className={styles.searchBar} type='text' placeholder='Search...' />
      <p>Log in</p>
    </header>
  )
}
