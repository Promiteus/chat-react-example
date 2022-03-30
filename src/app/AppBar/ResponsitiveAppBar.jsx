import React, {useState} from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container, Divider,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import {MenuListSvg, PersonSvg, SearchSvg} from "../Svg";
import {BASE_DATA_URL} from "../Stores/api/Common/ApiCommon";
import {IMG_LOGO} from "../../assets";
import {LogoutOutlined, Person} from "@mui/icons-material";
import RoundSubstrate from "../Svg/Sunstrate/RoundSubstrate";
import {useNavigate} from "react-router-dom";
import {ROUTE_PROFILE, ROUTE_SIGNUP} from "../Constants/Routes";


const menuItems = [
    {img: <Person />, title: 'Настройки профиля'},
    {img: <LogoutOutlined />, title: 'Выход'}
];

const ResponsiveAppBar = ({user}) => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavigate = (index) => {
        switch (index) {
            case 0: //Настройки профиля
                navigate(`${ROUTE_PROFILE}?userId=${user?.id}`);
                break;
            case 1: //Выход
                navigate(`${ROUTE_SIGNUP}`);
                break;
        }

    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" elevation={1} sx={{backgroundColor: 'orange'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Box
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <img alt="logo" src={IMG_LOGO} style={{height: 50}}/>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuListSvg />
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
                    <Box
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <img alt="logo" src={IMG_LOGO} style={{height: 50}}/>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {(!user) ?
                                    <Avatar sx={{backgroundColor: "#5e35b1"}}/> :
                                    <Avatar sx={{backgroundColor: "#5e35b1"}} src={`${BASE_DATA_URL}${user?.thumbUrl?.src}`} />}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
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
                            {menuItems.map((item, index) => (
                                <MenuItem key={index} onClick={() => {handleCloseNavMenu(); handleNavigate(index);}}>
                                    <div className="mr-2"><RoundSubstrate color="orange" children={item?.img} /></div>
                                    <Typography >{item?.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;