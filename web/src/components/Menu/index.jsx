import React, { useState, useContext } from 'react';
import StoreContext from '../Store/Context';

import './styles.css';

import Logo from '../../assets/logo-uiecb-cinza.png';
import clsx from 'clsx';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, useTheme } from '@material-ui/core';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 100,
    marginLeft: -12,
    marginTop: 16,
    marginBottom: 16,
  },
}));

function Menu() {
    const { setToken } = useContext(StoreContext);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const goToCreateReceipt = () => {
        history.push('/create-receipt');
    };

    const goToReceipt = () => {
      history.push('/');
    };

    const logoutExit = () => {
      setToken(null);
      history.push('/login');
    }

    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                })}
                classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
                }}
                onMouseEnter={handleDrawerOpen}
                onMouseLeave={handleDrawerClose}
            >
                <header>
                    <img className={classes.logo} src={Logo} alt="Logo UIECB"/>
                </header>
                <Divider />
                <List>
                    <ListItem button key="receipts" onClick={goToReceipt} >
                      <ListItemIcon> <LibraryBooksIcon className={classes.icon} htmlColor='#353535' /> </ListItemIcon>
                      <ListItemText primary="Recibos" />
                    </ListItem>
                    <ListItem button key="create-receipt" onClick={goToCreateReceipt} >
                      <ListItemIcon> <LibraryAddIcon className={classes.icon} htmlColor='#353535' /> </ListItemIcon>
                      <ListItemText primary="Criar Recibo" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem button key="receipts" onClick={logoutExit} >
                    <ListItemIcon> <ExitToAppIcon className={classes.icon} htmlColor='#353535' /> </ListItemIcon>
                    <ListItemText primary="Sair" />
                  </ListItem>
                </List>
                {/* <Divider />
                <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon className={classes.icon} htmlColor='#353535' /> : <MailIcon className={classes.icon} htmlColor='#353535' />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List> */}
            </Drawer>
        </div>
    )
}

export default Menu;