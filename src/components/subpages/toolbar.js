import styles from '@/styles/Home.module.css'
import * as React from 'react';
import { useState } from 'react';
import { Link, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Drawer, Toolbar, Box } from "@mui/material/";
import Featuredrawer1 from './featuredrawer1';
import MenuIcon from '@mui/icons-material/Menu';
import { detectOverflow } from '@popperjs/core';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonIcon from '@mui/icons-material/Person';

const Toolbars = () => {

    const [anchorDrawer, setAnchorDrawer] = useState(null);
    const openDrawer = (event) => {
        setAnchorDrawer(event.currentTarget);
    }
    const closeDrawer = () => {
        setAnchorDrawer(null);
    }

    const [firstDrawer, setfirstDrawer] = useState(null);
    const openfirstDrawer = (event) => {
        setfirstDrawer(event.currentTarget);
    }
    const closefirstDrawer = () => {
        setfirstDrawer(null);
    }

    return (

        <Toolbar className={styles.appbar} sx={{ border: 1, borderColor: 'white' }}>
            <Link onClick={openDrawer} sx={{ color: 'white' }}><MenuIcon /></Link>
            <Drawer
                anchor='left'
                open={Boolean(anchorDrawer)}
                onClose={closeDrawer}

                PaperProps={{
                    sx: {
                        //marginTop: "100px",
                        marginLeft: "50px",
                        backgroundColor: "#2d698b",
                        color: "white",
                        flexGrow: 1,
                        width: "100%"
                    }
                }}
            >

                <Box sx={{ mt: 3, ml: 2 }}>
                    <div className={styles.toolbarspacingh}>
                        <PersonIcon />
                        <VideocamIcon />
                    </div>
                    <div className={styles.mainheading}>Form Templates

                    </div>
                    <List sx={{ ml: 2 }}>


                        <ListItem disablePadding sx={{ marginLeft: 2 }}>
                            <MenuIcon />
                            <div className={styles.horizontal_spacing}></div>
                            <Link underline="hover" onClick={openfirstDrawer} sx={{ color: 'white' }} >
                                <ListItemText primaryTypographyProps={{ sx: { fontSize: '24px', textTransform: 'none' } }}>
                                    PHQ - 9 </ListItemText>
                            </Link>
                            <Drawer
                                anchor='left'
                                open={Boolean(firstDrawer)}
                                onClose={closefirstDrawer}

                                PaperProps={{
                                    sx: {
                                        //marginTop: "100px",
                                        marginLeft: "50px",
                                        backgroundColor: "#2d698b",
                                        color: "black",
                                        flexGrow: 1,
                                        width: "100%",
                                        paddingRight: "60px"
                                    }
                                }}
                            >
                                <Featuredrawer1 />
                            </Drawer>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><MenuIcon /></ListItemIcon>
                                <ListItemText primary={"f2"} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><MenuIcon /></ListItemIcon>
                                <ListItemText primary={"f3"} />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <List sx={{ ml: 2 }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary={"f4"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton >

                                <ListItemText primary={"f5"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary={"f6"} />
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Box>
            </Drawer>
            <div className={styles.toolbarspacingh}>
                <PersonIcon />
                <VideocamIcon />
            </div>
        </Toolbar>
    )
}

export default Toolbars