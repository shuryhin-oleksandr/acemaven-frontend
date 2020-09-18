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
        color: '#115B86',

    },
    tabButton: {
        '& .MuiTab-root' : {
            fontFamily: 'Helvetica Reg',
            fontSize: '14px'
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