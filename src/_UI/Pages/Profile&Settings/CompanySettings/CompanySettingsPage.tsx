import React from "react";
//material ui
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
//components
import CompanyInfoContainer from "./CompanyInfo/CompanyInfoContainer";
import BankAccountsContainer from "./BankAccounts/BankAccountsContainer";
//styles
import {CompanyInner, CompanySettingsContainer, PageTitle} from "./company-settings-styles";
import CreditCardsContainer from "./credit_cards/CreditCardsContainer";
import {AppCompaniesTypes} from "../../../../_BLL/types/commonTypes";


export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
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
        '& .MuiTab-root': {
            fontFamily: 'Helvetica Reg',
            fontSize: '14px',
        }
    },
    tabContent: {
        height: '100%',
        flexGrow: 1
    }
}));

type PropsType = {
    company_type: string,
    current_user_role: string[],
    isFetching: boolean
}

const CompanySettingsPage: React.FC<PropsType> = ({company_type, current_user_role, isFetching}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const tabs = [
        <Tab className={classes.tabButton} label="Company info" value="1" key={1}/>,
        <Tab className={classes.tabButton} label="Bank Accounts" value="2" key={2}/>,
        <Tab className={classes.tabButton} label="Credit Cards" value="3" key={3}/>
    ]

    return (
        <CompanySettingsContainer>
            <CompanyInner>
                <PageTitle>Company Settings</PageTitle>
                <div className={classes.root}>
                    <TabContext value={value}>
                        <AppBar className={classes.header} position="static">
                            {(company_type === AppCompaniesTypes.CLIENT)
                                ? <TabList onChange={handleChange} aria-label="simple tabs example">
                                    {tabs[0]}
                                  </TabList>
                                : <TabList onChange={handleChange} aria-label="simple tabs example">
                                    {tabs}
                                  </TabList>
                            }
                        </AppBar>
                        <TabPanel value="1" className={classes.tabContent}>
                            <CompanyInfoContainer company_type={company_type}
                                                  current_user_role={current_user_role}
                                                  isFetching={isFetching}
                            />
                        </TabPanel>
                        <TabPanel value="2" className={classes.tabContent}>
                            <BankAccountsContainer current_user_role={current_user_role}
                                                   isFetching={isFetching}
                            />
                        </TabPanel>
                        <TabPanel value="3" className={classes.tabContent}>
                            <CreditCardsContainer credit_cards={[]}
                                                  current_user_role={current_user_role}
                                                  isFetching={isFetching}
                            />
                        </TabPanel>
                    </TabContext>
                </div>
            </CompanyInner>
        </CompanySettingsContainer>
    )
}

export default CompanySettingsPage