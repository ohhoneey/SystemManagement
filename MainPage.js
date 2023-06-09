import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useState} from "react";
import Profile from "./Profile";
import GroupsIcon from '@mui/icons-material/Groups';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TableBarIcon from '@mui/icons-material/TableBar';
import Notes from "./Notes/Notes";
import Calendar from "./Calendar/Calendar"
import LeaveRequest from "./LeaveRequest";
import BookPlace from "./BookPlace";
import Meetings from "./Meetings";

const drawerWidth = 240;

const MainPage = ({userData}) => {
    const [page, setPage] = useState('Profile')

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {page}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar sx={{justifyContent: "center"}}>
                    <Typography variant="h6" >
                        Menu
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                        <ListItem key={'Profile'} disablePadding onClick={() => {setPage('Profile')}}>
                            <ListItemButton selected={page === 'Profile'}>
                                <ListItemIcon>
                                    <AccountBoxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </ListItemButton>
                        </ListItem>
                    <ListItem key={'Notes'} disablePadding onClick={() => {setPage('Notes')}}>
                        <ListItemButton selected={page === 'Notes'}>
                            <ListItemIcon>
                                <TextSnippetIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Notes'} />
                        </ListItemButton>
                    </ListItem>
                    {/*<ListItem key={'Calendar'} disablePadding onClick={() => {setPage('Calendar')}}>*/}
                    {/*    <ListItemButton selected={page === 'Calendar'}>*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <CalendarMonthIcon/>*/}
                    {/*        </ListItemIcon>*/}
                    {/*        <ListItemText primary={'Calendar'} />*/}
                    {/*    </ListItemButton>*/}
                    {/*</ListItem>*/}
                    <ListItem key={'LeaveRequest'} disablePadding onClick={() => {setPage('LeaveRequest')}}>
                        <ListItemButton selected={page === 'LeaveRequest'}>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Leave request'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'BookPlace'} disablePadding onClick={() => {setPage('BookPlace')}}>
                        <ListItemButton selected={page === 'BookPlace'}>
                            <ListItemIcon>
                                <TableBarIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Book place'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'Meetings'} disablePadding onClick={() => {setPage('Meetings')}}>
                        <ListItemButton selected={page === 'Meetings'}>
                            <ListItemIcon>
                                <GroupsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Meetings'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'AddGoals'} disablePadding onClick={() => {setPage('AddGoals')}}>
                        <ListItemButton selected={page === 'AddGoals'}>
                            <ListItemIcon>
                                <AddBoxIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Add goals'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'CollectGoals'} disablePadding onClick={() => {setPage('CollectGoals')}}>
                        <ListItemButton selected={page === 'CollectGoals'}>
                            <ListItemIcon>
                                <LibraryBooksIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Collect goals'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: '#231E39', p: 3 }}
            >
                <Toolbar />
                {page === 'Profile' ?
                    <Profile userData={{userData}}/> : page === 'Notes' ? <Notes/> : page === 'Calendar'
                        ? <Calendar  userData={userData}/> : page === 'LeaveRequest' ? <LeaveRequest userData={userData}/> : page === 'BookPlace' ? <BookPlace userData={userData}/> : page === 'Meetings' ? <Meetings userData={userData}/> : <h1 style={{color: 'white'}}>Development in progress</h1>}
            </Box>
        </Box>
    );
}

export default MainPage;
