import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import useMediaQuery from '@mui/material/useMediaQuery'

import styles from '../styles/Home.module.css'
import { getTransactions } from "../services/GetFetch";
import Navbar from "../components/Navbar";
import LineChart from "../components/charts/LineChart";
import { formatDate } from "../services/DateFormater";
import { theme } from "../theme";

import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ShopLogo from '../public/shopping-cart.png'
import MastercardLogo from '../public/LogoPackage/Mastercard-Logo.wine.png'
import discountDraw from '../public/undraw_statistic_chart_re_w0pk.svg'
import offer from '../public/noun-offer-5373216.svg'
import Wave from '../public/Wave.svg'
import PointGreen from '../public/noun-circleGreen.svg'
import PointRed from '../public/noun-circleRed.svg'
import User from '../public/noun-user.svg'
import CardAd from '../public/undraw_stripe_payments_re_chlm.svg'
import Sidebar from "../components/Sidebar";

const Grid = dynamic(() => import('@mui/material/Unstable_Grid2/Grid2'), {
  ssr: false
})

export default function Home() {
  const [transactions, setTransactions] = useState([])
  const matches = useMediaQuery('(max-width:790px)')
  console.log(matches)

  useEffect(() => {
    async function fetchData() {
      await getTransactions("ivoPascal@gmail.com").then(res=> setTransactions(res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())))// setTransactions(res))
    }
    fetchData()
  }, [])

  return (
    <Grid
      container
      direction='row'
    >
      {/* <Sidebar /> */}
      {!matches ? <Sidebar /> : null}
      <Image priority={true} src={Wave} style={{zIndex: -1, position: 'absolute', rotate: '180deg', width: '100%', height: '200px'}} alt='Wave' />
      <Grid
        gap={3}
        container
        height='auto'
        padding='15px'
        direction='column'
        sx={{
          width: matches ? '100%' : "calc(100% - 250px)"
        }}
      >
        <Grid display='flex' gap={1} alignItems='center'>
          <Image src={User} width={30} alt='user' />
          <Typography textAlign='center' fontWeight='bold' color='white' variant='p'>
            Ivo Javier Pascal Ríos
          </Typography>
        </Grid>
        <Grid
          container
          gap={2}
          alignItems='center'
        >
          <Grid
            container
            width='100%'
            height='150px'
            borderRadius='15px'
            boxShadow='0px 0px 9px -5px black'
            bgcolor='white'
            direction='row'
            display='flex'
            flexDirection='row'
            padding='15px 30px'
            alignItems='center'
            justifyContent='space-around'
            sm={7}
            md={6}
            lg={5}
            xl={4}
          >
            <Grid display='flex' alignItems='center' flexDirection='column'> 
              <Typography color={theme.light.lightText} fontSize='14px' variant="p">
                Total balance
              </Typography>
              <Typography fontSize='26px' variant="p">
                $450 000
              </Typography>
            </Grid>
            {/* <Grid width='100px'>
              <LineChart color='blue' transactions={transactions} />
            </Grid> */}
            <Grid
              container
              direction='column'
              gap='5px'
            >
              <Grid
                position='relative'
                display='flex'
                flexDirection='row'
                alignItems='center'
                gap='10px'
              >
                <Image src={PointGreen} width={15} alt='point' />
                <Grid display='flex' flexDirection='column'>
                  <Typography fontWeight='bold' color={theme.light.lightText} fontSize='12px' variant="p">
                    Earned
                  </Typography>
                  <Typography fontSize='20px' variant="p">
                    $3,450
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                position='relative'
                display='flex'
                flexDirection='row'
                alignItems='center'
                gap='10px'
              >
                <Image src={PointRed} width={15} alt='point' />
                <Grid display='flex' flexDirection='column'>
                  <Typography fontWeight='bold' color={theme.light.lightText} fontSize='12px' variant="p">
                    Spent
                  </Typography>
                  <Typography fontSize='20px' variant="p">
                    $1,230
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            height='150px'
            xs={12}
            sm={true}
            md={5}
            lg={5}
            xl={4}
            sx={{
              position: 'relative',
              backgroundColor: '#9778FB',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 15px',
              justifyContent: 'center',
              alignItems: 'flex-end',
              textShadow: '1px 1px 2px black'
            }}
            className={styles.cardDiv}
          >
            <p style={{
              fontSize: '22px',
              fontWeight:'bold',
              color: 'white',
              textAlign: 'end'
            }}
            >
            <span style={{verticalAlign: 'middle'}}>**** **** ****</span> 5432</p>
            <div style={{textAlign: 'center', position: 'absolute', bottom: '5px'}}>
              <p style={{fontSize: '16px', color: 'white'}}>12/23</p>
            </div>
            <Image className={styles.mastercardLogo} width={50} src={MastercardLogo} alt="mastercard_logo" />
          </Grid>
        </Grid>
        {/* <div className={styles.actions}>
          <Link className={styles.toTransaction} href="/">
          <Image src={PlusPlogo} alt="plusLogo" width={26} />
          Debit
          </Link>
        </div> */}
        <Typography
          style={{
            textIndent: '5px'
          }}
          fontWeight='bold'
          fontSize='1.2rem'
          variant='p'
          marginTop='15px'
          marginBottom='7px'  
        >
          News
        </Typography>
        <List
          sx={{
            width: '100%',
            overflow: 'auto',
            flexDirection: 'row',
            gap: '15px',
            display: 'flex',
            paddingX: '2px'
          }}
        >
          <ListItem
            sx={{
              width: 'auto',
              padding: 0,
            }}>
            <Box
              position='relative'
              width='300px'
              height= '160px'
              padding='15px 30px'
              bgcolor='#EFF3F5'
              // bgcolor={theme.light.bgBox}
              borderRadius='20px'
              boxShadow='0px 0px 9px -5px black'
              display='flex'
              alignItems='flex-end'
              justifyContent='center'
              flexDirection='column'
            >
              <Image
                src={discountDraw}
                alt='draw'
                width={90}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 20
                }}
              />
              <Typography variant="p" fontWeight='light' fontSize='14px'>
                Ahora con
                <span style={{fontSize: '24px', color: '#f15454', fontWeight: 'bold'}}> Seeski</span>
              </Typography>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Typography
                  color='#f15454'
                  fontWeight='bold'
                  fontSize='20px'
                  variant="p"
                >
                  50
                </Typography>
                <Image width={50} src={offer} alt='offer' />
                <Typography
                  variant="p"
                  color='#f15454'
                >
                  en
                </Typography>
              </div>
              <Typography variant="p" fontWeight='bold'>
                Apple Store
              </Typography>
            </Box>
          </ListItem>
          <ListItem
            sx={{
              padding: 0,
              width: 'auto'
            }}
          >
            <Box
              position='relative'
              width='330px'
              height='160px'
              // padding='15px 30px'
              bgcolor='#EFF3F5'
              borderRadius='20px'
              boxShadow='0px 0px 9px -5px black'
              display='flex'
              alignItems='center'
            >
              <Image
                priority={true}
                src={CardAd}
                alt='card ad'
                style={{
                  backgroundColor: theme.light.details,
                  width: '50%',
                  height: '160px',
                  borderTopLeftRadius: '20px',
                  borderBottomLeftRadius: '20px'
                }}
              />
              <Typography fontSize='14px' padding='10px' variant='p'>
                Pide tu tarjeta ahora y utilizala en tu tienda más cercana.
              </Typography>
            </Box>
          </ListItem>
        </List>
        {/* <Grid width='100%'>
          <LineChart lineColor='#F16F6F' color='#F16F6F' transactions={transactions} />
        </Grid> */}
        <Grid sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          marginTop: '10px',
        }} >
        <h3>Latest Transactions</h3>
        <List height='100px' width='80px'>
          {
            transactions !== undefined && typeof transactions === typeof new Array ? 
            transactions.map((transaction, index) => {
              return(
                <ListItem 
                style={index === transactions.length - 1 ? {border: 'none'} : null}
                key={transaction.id}
                className={styles.transactionContainer}
                >
                  <ListItemIcon>
                    {/* <Avatar src='../public/shopping-cart.png' alt="shopLogo" /> */}
                    <Image src={ShopLogo} alt="shopLogo" className={styles.shopLogo} width={40} />
                  </ListItemIcon>
                  <ListItemText
                    primary={transaction.name}
                    secondary={
                      <React.Fragment>
                        {transaction.description}
                      </React.Fragment>
                    }
                  />
                    <div>
                      {
                        transaction.type === 'DEBIT' ?
                          <Typography color='red' fontWeight='bold' component='p'>
                            -${transaction.amount}
                          </Typography>
                        :
                        null
                      }
                      {
                        transaction.type === 'CREDIT' ?
                          <Typography color='green' fontWeight='bold' component='p'>
                            +${transaction.amount}
                          </Typography>
                        :
                        null
                      }
                      <Typography
                        textAlign='end'
                        fontSize='.9rem'
                        component='p'
                      >
                        {formatDate(transaction.date).dayAndMonth}
                      </Typography>
                    </div>
                </ListItem>
              )
            })
          :
          ""
        }
        </List>
        </Grid>
      </Grid>
      {matches ? <Navbar /> : ""}
    </Grid>
  )
}

// export async function getServerSideProps(context) {
//   const response = await getTransactions("ivoPascal@gmail.com")
//   // const data = await response.json()
//   console.log(response)
//   return {
//     props: {
//       response: response !== undefined ? response : []
//     }
//   }
// }