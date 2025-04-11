import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Paper } from '@mui/material';
import CartDrawerChakra from './CartDrawerChakra';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { authContext } from '../contexts/AuthContext';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Badge } from 'flowbite-react';


export default function SimpleBottomNavigation() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const auth = React.useContext(authContext)
    const [showComponent, setShowComponent] = React.useState(false)
    const [value, setValue] = React.useState(0);
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} className='bg-black'>

            <Box className='bg-black'>
                <BottomNavigation showLabels value={value} onChange={(event, newValue) => { setValue(newValue) }}    >
                    <BottomNavigationAction icon={<HomeIcon />} component={Link} to="/" />
                    <BottomNavigationAction label="Cart" icon={<HomeIcon />} component={CartDrawerChakra} to="/home" />
                    {auth.loginDetails ? <>
                        <BottomNavigationAction label="Recents" icon={<AccountCircleIcon />} component={Link} to="/userdashboard" />
                    </> : <>
                    {/* <BottomNavigationAction label="Recents" icon={<AccountCircleIcon />} component={LoginModal} /> */}
                    </>}
                    <BottomNavigationAction icon={ <Badge badgeContent={1} color="secondary" className=''>
                        <FavoriteIcon />
                    </Badge>} component={Link} to="/wishlist" />
                    <BottomNavigationAction icon={<StorefrontIcon />} component={Link} to="/sellerdashboard" />
                   
                </BottomNavigation>
            </Box>
        </Paper>

    );
}
