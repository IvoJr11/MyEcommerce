import Link from "next/link";
import Image from "next/image";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography } from "@mui/material";
import dynamic from "next/dynamic";

import home from '../public/noun-home-1145514.svg'
import transaction from '../public/noun-transaction-3844872.svg'
import chart from '../public/noun-bar-chart-2849598.svg'
import config from '../public/noun-adjust-3324337.svg'
import { Box } from "@mui/system";

const Grid = dynamic(() => import('@mui/material/Unstable_Grid2/Grid2'), {
  ssr: false
})

const links = [{
  link: 'home',
  name: 'Home',
  icon: home,
  width: 45
},
{
  link: 'transactions',
  name: 'Transactions',
  icon: transaction,
  width: 40
},
{
  link: 'stats',
  name: 'Stats',
  icon: chart,
  width: 30
},
{
  link: 'configs',
  name: 'Configuration',
  icon: config,
  width: 40
}]
const sidebarWidth = 250
export default function Sidebar() {
  return(
    <Drawer
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
          width: sidebarWidth,
        }}
      >
        {
          links.map(link => {
            return (
              <ListItem key={link}>
                <ListItemButton>
                  <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}
                  >
                    <ListItemIcon>
                      <Image src={link.icon} width={35} alt='icon' />
                    </ListItemIcon>
                    <Link href={link.link}>
                      {link.name}
                    </Link>
                  </Box>
                {/* <ListItemText primary= /> */}
                </ListItemButton>
              </ListItem>
            )
          })
        }
      </List>
    </Drawer>
  )
}