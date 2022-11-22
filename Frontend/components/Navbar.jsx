import Image from 'next/image'

import styles from './Header.module.css'
import logo from '../public/e-commerce-logos.jpeg'

export default function Navbar () {
  return (
    <nav className={styles.navbar}>
      <Image src={logo} alt='logo' width={40} className={styles.navIcon}/>
      <Image src={logo} alt='logo' width={40} className={styles.navIcon}/>
      <Image src={logo} alt='logo' width={40} className={styles.navIcon}/>
      <Image src={logo} alt='logo' width={40} className={styles.navIcon}/>
      {/* <input className={styles.searchBar} type='text' placeholder='Search...' /> */}
    </nav>
  )
}
