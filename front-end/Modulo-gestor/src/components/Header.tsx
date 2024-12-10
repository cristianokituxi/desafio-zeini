import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { version } from '../../package.json';
import { Badge, Chip, Divider, ListItemIcon, SvgIcon } from '@mui/material';
import { useAuthContext } from '../context/auth/AuthContext';


type HandleDrawerToggleType = () => void;
type Opentype = boolean;

interface HeaderProps {
    handleDrawerToggle: HandleDrawerToggleType;
    open: Opentype;
}

function Header({ handleDrawerToggle, open }: HeaderProps) {
    const { user, handleLogout } = useAuthContext()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const LogOutFunc = async () => {
        handleLogout();
    };


    return (
        <AppBar position="fixed">
            <Toolbar>

                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/dashboard"
                    sx={{
                        mr: 2,
                        display: { md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 500,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >

                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                    </Menu>

                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/dashboard"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 500,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                </Typography>
                <Box sx={{ flexGrow: 0, display: { marginInlineEnd: 20 } }}>
                    <Chip
                        icon={<Badge badgeContent={0} color="error" sx={{
                            color: 'white'
                        }}>
                            <NotificationsIcon sx={{
                                marginInlineStart: 2
                            }} />
                        </Badge>}
                        variant="filled"
                        sx={{
                            bgcolor: 'rgba(0, 0, 0, 0.356)',
                            boxShadow: 1,
                            minHeight: 48,
                            borderRadius: 2,
                        }}
                    />
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Chip
                        onClick={handleOpenUserMenu}
                        icon={
                            <div style={{
                                display: 'flex'
                            }}>

                                <Avatar alt="Natacha" src="/static/images/avatar/1.jpg"
                                    sx={{ width: 34, height: 34, marginInlineStart: 1 }}

                                />
                                <SvgIcon sx={{ width: 34, height: 34, color: 'powderblue', marginInlineStart: 2 }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                                        />
                                    </svg>

                                </SvgIcon>
                            </div>


                        }
                        variant="filled"
                        sx={{
                            minWidth: 90,
                            bgcolor: 'rgba(0, 0, 0, 0.356)',
                            boxShadow: 1,
                            minHeight: 48,
                            borderRadius: 10,
                        }}
                    />

                    <Menu
                        sx={{ mt: '45px', minWidth: 300 }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <div style={{
                            display: 'flex',
                            margin: '15px',
                            fontSize: '15px'
                        }}>
                            <b>OLÀ,</b><p> {user?.nome}  {user?.sobrenome}</p>
                        </div>

                        <Divider />

                        <MenuItem onClick={LogOutFunc} sx={{
                            color: 'red'
                        }}>
                            <ListItemIcon sx={{
                                color: 'red'
                            }}>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Sair
                        </MenuItem>
                        <Divider />
                        <Typography sx={{ p: 2, color: 'text.secondary' }}>Versão: {version}</Typography>
                    </Menu>
                </Box>
            </Toolbar>

        </AppBar>
    );
}
export default Header;
