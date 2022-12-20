import Link from "next/link"
import Image from "next/image"

import { Box } from "@mui/system"
import { Typography } from "@mui/material"

import backArrow from '../public/noun-back.svg'

export default function Header({ title }) {
  return (
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
  )
}