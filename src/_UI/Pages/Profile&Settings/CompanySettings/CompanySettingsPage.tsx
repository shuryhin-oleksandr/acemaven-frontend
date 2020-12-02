import React from "react";
import {useSelector} from "react-redux";
//material ui
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
//components
import CompanyInfoContainer from "./CompanyInfo/CompanyInfoContainer";
import BankAccountsContainer from "./BankAccounts/BankAccountsContainer";
import Spinner from "../../../../_UI/components/_commonComponents/spinner/Spinner";
//styles
import {CompanyInner, CompanySettingsContainer, PageTitle} from "./company-settings-styles";
import CreditCardsContainer from "./credit_cards/CreditCardsContainer";
//_BIL
import {AppStateType} from "../../../../_BLL/store";


export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: '100%',
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
            fontFamily: 'Helvetica Reg',
            fontSize: '14px',
            border: '2px solid #7C7C89',
            borderBottom: 0,
            margin: '0 6px',
            textTransform: 'none',
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

        '& .MuiTabs-indicator': {
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
    },
    tabContent: {
        height: "calc(100% - 50px)"
    }
}));

type PropsType = {
    company_type: string
}

const CompanySettingsPage:React.FC<PropsType> = ({company_type}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
    const authUserInfo = useSelector((state: AppStateType) => state.profile.authUserInfo)

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
                                <Tab className={classes.tabButton} label="Company info" value="1" />
                                <Tab className={classes.tabButton} label="Bank Accounts" value="2" />
                                <Tab className={classes.tabButton} label="Credit Cards" value="3" />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            {!!authUserInfo ? <CompanyInfoContainer company_type={company_type}/> : <Spinner/>}
                        </TabPanel>
                        <TabPanel value="2" className={classes.tabContent}><BankAccountsContainer /></TabPanel>
                        <TabPanel value="3" className={classes.tabContent}><CreditCardsContainer credit_cards={[]}/></TabPanel>
                    </TabContext>
                </div>
            </CompanyInner>
        </CompanySettingsContainer>
    )
}

export default CompanySettingsPage