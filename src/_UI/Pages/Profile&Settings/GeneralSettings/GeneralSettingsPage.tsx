import React from "react";
//material ui
import TabContext from "@material-ui/lab/TabContext";
import {AppBar} from "@material-ui/core";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
//types
import {AppCompaniesTypes} from "../../../../_BLL/types/commonTypes";
import {settingsType} from "../../../../_BLL/types/profile/profileTypes";
//components
import EmailNotifications from "./notifications/EmailNotifications";
import {useStyles} from "../CompanySettings/CompanySettingsPage";
import PartnersTable from "./partners_table/PartnersTable";
//styles
import {
    GeneralContainer,
    GeneralInner,
    GeneralTitle
} from "./general-settings-styles";


type PropsType = {
    company_type: string,
    my_settings: settingsType | null
}

const GeneralSettingsPage: React.FC<PropsType> = ({company_type, my_settings}) => {
    const classes = useStyles()
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const tabs = [
        <Tab className={classes.tabButton} label="Email Notifications" value="1"/>,
        <Tab className={classes.tabButton} label="Partners Table" value="2"/>
    ]

    return (
        <GeneralContainer>
            <GeneralInner>
                <GeneralTitle>Settings</GeneralTitle>
                <div className={classes.root}>
                    <TabContext value={value}>
                        <AppBar className={classes.header} position="static">
                            {company_type === AppCompaniesTypes.CLIENT
                                ? <TabList onChange={handleChange} aria-label="simple tabs example">
                                    {tabs}
                                </TabList>
                                : <TabList onChange={handleChange} aria-label="simple tabs example">
                                    {tabs[0]}
                                </TabList>
                            }
                        </AppBar>
                        <TabPanel value="1">
                            <EmailNotifications my_settings={my_settings}/>
                        </TabPanel>
                        {company_type === AppCompaniesTypes.CLIENT
                        && <TabPanel value="2">
                            <PartnersTable/>
                        </TabPanel>}
                    </TabContext>
                </div>

            </GeneralInner>
        </GeneralContainer>
    )
}

export default GeneralSettingsPage