import Image from 'next/image'

import styles from './Header.module.css'
import logo from '../public/LogoPackage/logo(1).png'

export default function Navbar () {
  return (
    <nav className={styles.navbar}>
      <p>H</p>
      <p>T</p>
      <Image src={logo} width={50} alt='logo' className={styles.navIcon}/>
      <p>S</p>
      <p>C</p>
    </nav>
  )
}
