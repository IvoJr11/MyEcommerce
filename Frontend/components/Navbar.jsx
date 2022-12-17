import Image from 'next/image'

import styles from './Header.module.css'
import logo from '../public/ModerLogoPack/logo(2).png'
import home from '../public/noun-home-1145514.svg'
import transaction from '../public/noun-transaction-3844872.svg'
import chart from '../public/noun-bar-chart-2849598.svg'
// import config from '../public/noun-config-2825207.svg'
import config from '../public/noun-adjust-3324337.svg'
import Link from 'next/link'

export default function Navbar () {
  return (
    <nav className={styles.navbar}>
      <Link href='/home' style={{display: 'flex'}}>
        <Image src={home} width={45} alt='homeLogo' />
      </Link>
      <Link href='/transactions' style={{display: 'flex'}}>
        <Image src={transaction} width={40} alt='transactionLogo' />
      </Link>
      <div />
      <Image src={logo} alt='logo' width={55} height={55} className={styles.navIcon}/>
      <Link href='/stadistics' style={{display: 'flex'}}>
        <Image src={chart} width={30} alt='chartLogo' />
      </Link>
      <Link href='/configs' style={{display: 'flex'}}>
        <Image src={config} width={40} alt='cfgLogo' />
      </Link>
    </nav>
  )
}
