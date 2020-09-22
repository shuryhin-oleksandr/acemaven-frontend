import React from "react";
import {CompanyInner, CompanySettingsContainer, PageTitle} from "./company-settings-styles";

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import CompanyInfoContainer from "./CompanyInfo/CompanyInfoContainer";
import BankAccountsContainer from "./BankAccounts/BankAccountsContainer";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        height: '100%'
    },
    header: {
        backgroundColor: 'white',
        boxShadow: 'none',
        color: '#115B86',
        borderBottom: '2px solid #7C7C89',
        paddingLeft: '25px',


        '& .MuiTab-textColorInherit': {
            opacity: 1,
            fontWeight: 'bold',
            border: '2px solid #7C7C89',
            borderBottom: 0,
            margin: '0 6px'
        },

        '& .MuiTabs-fixed': {
            overflow: 'visible!important'
        },

        '& .MuiTabs-root': {
            overflow: 'visible!important'
        },

        '& .MuiTab-textColorInherit.Mui-selected': {
            color: '#ffffff',
            background: '#000000',
            transition: '.2s',
            fontWeight: 'bold',
            border: 'none'
        },

        '& .PrivateTabIndicator-colorSecondary-6': {
            backgroundColor: '#1AB8E6',
            height: '4px',
            bottom: '-2px'
        }
    },
    tabButton: {
        '& .MuiTab-root' : {
            fontFamily: 'Helvetica Reg',
            fontSize: '14px',
        }
    }
}));

const CompanySettingsPage:React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <CompanySettingsContainer>
            <CompanyInner>
                <PageTitle>Company Settings</PageTitle>
                <div className={classes.root}>
                    <TabContext value={value}>
                        <AppBar className={classes.header} position="static">
                            <TabList onChange={handleChange} aria-label="simple tabs example">
                                <Tab className={classes.tabButton} label="Item One" value="1" />
                                <Tab className={classes.tabButton} label="Item Two" value="2" />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1"><CompanyInfoContainer /></TabPanel>
                        <TabPanel value="2"><BankAccountsContainer /></TabPanel>
                    </TabContext>
                </div>
            </CompanyInner>
        </CompanySettingsContainer>
    )
}

export default CompanySettingsPage