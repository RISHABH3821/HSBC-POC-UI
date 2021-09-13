import React from 'react';
import Paper from '@material-ui/core/Paper';
import './UserPage.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { LoginPage } from './LoginPage';
import { colors, Snackbar } from '@material-ui/core';
import { SignUpPage } from './SignUpPage';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>{children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
}


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
}));

export const UserPage = (props) =>{
    const {logUser} = props;
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const primaryColor = colors.indigo[500];
    const white = '#fff';
    const black = '#000';
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleSavingCredentials = (userName, password)=>{
        // Store
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("password", password);
        console.log(logUser)
        logUser();
    }
    

    return (
        <Paper className="container">
            <Tabs value={value} 
                onChange={handleChange} 
                variant="fullWidth"
                indicatorColor="primary"
            >
            <Tab
                value="one"
                label="Login"
                wrapped
                {...a11yProps('one')}
                style={{backgroundColor: value!=="one"? white:primaryColor, color:value!=="one"? black:white}}
            />
            <Tab value="two" label="Sign Up" {...a11yProps('two')} style={{backgroundColor: value!=="two"? white:primaryColor, color:value!=="two"? black:white}}/>
            </Tabs>
            <TabPanel value={value} index="one">
                <LoginPage saveCredentials = {handleSavingCredentials}/>
            </TabPanel>
            <TabPanel value={value} index="two">
                <SignUpPage saveCredentials = {handleSavingCredentials}/>
            </TabPanel>
        </Paper>
        
    );
}