import Image from 'next/image'

import styles from './Navbar.module.css'
import logo from '../public/ModerLogoPack/logo(2).png'
import home from '../public/noun-home-1145514.svg'
import transaction from '../public/noun-transaction-3844872.svg'
import chart from '../public/noun-bar-chart-2849598.svg'
import config from '../public/noun-adjust-3324337.svg'
import Link from 'next/link'
import Plus from '../public/noun-plus.svg'
import { theme } from '../theme'
import dynamic from 'next/dynamic'

const Grid = dynamic(() => import('@mui/material/Unstable_Grid2/Grid2'), {
  ssr: false
})

export default function Navbar () {
  return (
    <Grid style={{
      position: 'sticky',
      bottom: 0,
      width: '100%',
      height: '60px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: 'white',
      color: 'white'
    }}
    >
    <Link href='/home' style={{display: 'flex'}}>
      <Image src={home} width={45} alt='homeLogo' />
    </Link>
    <Link href='/transactions' style={{display: 'flex'}}>
      <Image src={transaction} width={40} alt='transactionLogo' />
    </Link>
    <div />
    <Link href='/transactions'
      style={{
        position: 'absolute',
        bottom: '50%',
        borderRadius: '50%',
        boxShadow: '0px 0px 9px -5px black',
        backgroundColor: '#6427FF',
        width: '55px',
        height: '55px'
      }}
    >
      <Image
        src={Plus}
        alt='logo'
        width={55}
      />
    </Link>
    <Link href='/stats' style={{display: 'flex'}}>
      <Image src={chart} width={30} alt='chartLogo' />
    </Link>
    <Link href='/configs' style={{display: 'flex'}}>
      <Image src={config} width={40} alt='cfgLogo' />
    </Link>
  </Grid>
  )
}
