import Navbar from "../components/Navbar";
import Image from "next/image";
import styles from '../styles/Home.module.css'
import MastercardLogo from '../public/LogoPackage/Mastercard-Logo.wine.png'
import { getTransactions } from "../services/GetFetch";
import { useEffect, useState } from "react";

export default function Home() {
  const [transactions, setTransactions] = useState([])
  
  useEffect(() => {
    getTransactions("ivoPascal@gmail.com")
      .then(res => setTransactions(res))
      console.log(transactions)
  }, [])

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '15px'}}>
        <div className={styles.homeDiv}>
          <div className={styles.amountDiv}>
            <p style={{fontSize: '27px'}}>$45000,</p>
            <small>83</small>
          </div>
          <div className={styles.cardDiv}>
            <p style={{fontSize: '22px', fontWeight:'bold', color: 'white'}}><span style={{verticalAlign: 'middle'}}>**** **** ****</span> 5432</p>
            <div style={{textAlign: 'center', position: 'absolute', bottom: '5px'}}>
              <p style={{fontSize: '16px', color: 'white'}}>12/23</p>
            </div>
            <Image className={styles.mastercardLogo} width={50} src={MastercardLogo} alt="mastercard_logo" />
          </div>
        </div>
        <div className={styles.actions}>
          
        </div>
        <div>
          <h3>Latest Transactions</h3>
          {transactions.map(transaction => {
            return(
              <div key={transaction.name}>
              <p>{transaction.name}</p> 
              </div>
            )
          })}
        </div>
      </div>
      <Navbar />
    </>
  )
}

// export async function getServerSideProps() {

//   const body = await getTransactions("ivoPascal@gmail.com")
  

//   return {
//     props: {
//       transactions: body
//     }
//   }
// }