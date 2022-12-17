import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import styles from '../styles/Home.module.css'
import { getTransactions } from "../services/GetFetch";
import Navbar from "../components/Navbar";
import LineChart from "../components/charts/LineChart";
import { formatDate } from "../services/DateFormater";

import { Avatar, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ShopLogo from '../public/shopping-cart.png'
import PlusPlogo from '../public/plus (1).png'
import MastercardLogo from '../public/LogoPackage/Mastercard-Logo.wine.png'
import backArrow from '../public/noun-back.svg'
import discountDraw from '../public/undraw_statistic_chart_re_w0pk.svg'
import offer from '../public/noun-offer-5373216.svg'

const Grid = dynamic(() => import('@mui/material/Unstable_Grid2/Grid2'), {
  ssr: false
})

export default function Home() {
  const [transactions, setTransactions] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      await getTransactions("ivoPascal@gmail.com").then(res=> setTransactions(res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())))// setTransactions(res))
    }
    fetchData()
  }, [])

  return (
    <>
      <Box
        position='relative'
        display='flex'
        justifyContent='center'
        alignItems='center'
        padding='20px'
      >
        <Link href='/home'
          style={{
            display: 'flex',
            position: 'absolute',
            left: '15px',
          }}
        >
          <Image
            style={{
              backgroundColor: '#EFF3F5',
              borderRadius: '50%',
              padding: '10px'
            }}
            width={40}
            src={backArrow}
            alt='arrow'
          />
        </Link>
        <Typography fontWeight='bold' variant="p">
          Dashboard
        </Typography>
      </Box>
      <Grid width='100%' container height='auto' padding='15px' bgcolor="white" direction='column'>
        <Grid container rowGap='15px' columnGap='15px'>
          <Grid
            height='100px'
            minWidth='150px'
            borderRadius='15px'
            xs={4}
            sm={1.5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15px',
              background: 'linear-gradient(20deg, rgb(46, 46, 46) 0%, rgb(145, 145, 145) 30%, rgb(231, 231, 231) 50%, rgb(165, 165, 165) 70%, rgb(172, 172, 172) 100%)'
            }}
          >
            <Typography fontFamily='poppins' textAlign="center" fontSize={22} variant="p">
              $45000,
              <small> 83</small>
            </Typography>
          </Grid>
          <Grid
            height='100px'
            minWidth='245px'
            // maxWidth='400px'
            // width={300}
            xs={7}
            sm={2}
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
              <p style={{fontSize: '22px', fontWeight:'bold', color: 'white'}}><span style={{verticalAlign: 'middle'}}>**** **** ****</span> 5432</p>
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
        <Stack overflow='auto' mt='15px' direction='row' display='flex'>
        <Grid>
          <Box
            position='relative'
            width='250px'
            height='125px'
            padding='15px 30px'
            bgcolor='#EFF3F5'
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
              width={75}
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
        </Grid>
        <Grid>
          <Box
            position='relative'
            width='250px'
            height='125px'
            padding='15px 30px'
            bgcolor='#EFF3F5'
            borderRadius='20px'
            boxShadow='0px 0px 9px -5px black'
            display='flex'
            alignItems='flex-end'
            justifyContent='center'
            flexDirection='column'
          />
        </Grid>
        <Grid>
          <Box
            position='relative'
            width='250px'
            height='125px'
            padding='15px 30px'
            bgcolor='#EFF3F5'
            borderRadius='20px'
            boxShadow='0px 0px 9px -5px black'
            display='flex'
            alignItems='flex-end'
            justifyContent='center'
            flexDirection='column'
          />
        </Grid>
        </Stack>
        <Grid width='100%'>
          <LineChart transactions={transactions} />
        </Grid>
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
                      <Typography textAlign='end' component='p'>
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
      <Navbar />
    </>
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