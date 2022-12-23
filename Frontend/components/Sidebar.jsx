import Link from "next/link";
import Image from "next/image";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography, Stack, Button } from "@mui/material";
import dynamic from "next/dynamic";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded'
import home from '../public/noun-home-1145514.svg'
import transaction from '../public/noun-transaction-3844872.svg'
import chart from '../public/noun-bar-chart-2849598.svg'
import config from '../public/noun-adjust-3324337.svg'
import { Box } from "@mui/system";
import { theme } from "../theme"

const Grid = dynamic(() => import('@mui/material/Unstable_Grid2/Grid2'), {
  ssr: false
})

const links = [{
  link: 'home',
  name: 'Home',
  icon: <HomeRoundedIcon />,
  width: 45
},
{
  link: 'transactions',
  name: 'Transactions',
  icon: <PriceChangeRoundedIcon />,
  width: 40
},
{
  link: 'stats',
  name: 'Stats',
  icon: <BarChartRoundedIcon />,
  width: 30
},
{
  link: 'configs',
  name: 'Configuration',
  icon: <SettingsApplicationsRoundedIcon />,
  width: 40
}]

const sidebarWidth = 250

export default function Sidebar() {
  
  return(
    <Drawer
      PaperProps={{
        sx:{
          // backgroundColor: 'red',
        }
      }}
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{
        height: '100%',
        width: sidebarWidth
      }}
      >
      <List
        disablePadding={true}
        sx={{
          width: sidebarWidth
        }}
      >
        {
          links.map(link => {
            return (
              <ListItem
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
                key={link.name}
              >
                <ListItemButton
                  sx={{
                    borderRadius: '10px',
                    backgroundColor: link.name === 'Home' ? theme.light.details : '',
                    color: link.name === 'Home' ? 'white' : '',
                    '&:hover': {
                      backgroundColor: theme.light.details,
                      color: 'white'
                    },
                    '&:hover *': {
                      color: 'white'
                    }
                  }}
                >
                    <ListItemIcon>
                      {link.icon}
                    </ListItemIcon>
                    <Link href={link.link === 'Home' ? '#' : link.link}>
                      {link.name}
                    </Link>
                </ListItemButton>
              </ListItem>
            )
          })
        }
      </List>
      {/* // <Stack
      //   direction='column'
      //   sx={{
      //     overflowY: 'auto',
      //     backgroundColor: theme.light.bgBox
      //   }}
      // >
      //   {
      //     links.map(link => {
      //       return (
      //         <Link key={link.link} href={link.link}
      //           style={{
      //             '&::hover': {
      //               backgroundColor: 'red'
      //             }
      //           }}
      //         >
      //           {link.name}
      //         </Link>
      //       )
      //     })
      //   }
      // </Stack> */}
    </Drawer>
  )
}