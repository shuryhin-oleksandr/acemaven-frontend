import TabContext from "@material-ui/lab/TabContext";
import React from "react";
import {
    GeneralContainer,
    GeneralInner,
    GeneralTitle
} from "./general-settings-styles";
import EmailNotifications from "./notifications/EmailNotifications";
import {useStyles} from "../CompanySettings/CompanySettingsPage";
import {AppBar} from "@material-ui/core";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import PartnersTable from "./partners_table/PartnersTable";




const GeneralSettingsPage:React.FC = () => {
    const classes = useStyles()
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <GeneralContainer>
            <GeneralInner>
                <GeneralTitle>Settings</GeneralTitle>
                <div className={classes.root}>
                    <TabContext value={value}>
                        <AppBar className={classes.header} position="static">
                            <TabList onChange={handleChange} aria-label="simple tabs example">
                                <Tab className={classes.tabButton} label="Email Notifications" value="1" />
                                <Tab className={classes.tabButton} label="Partners Table" value="2" />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1"><EmailNotifications/></TabPanel>
                        <TabPanel value="2"><PartnersTable /></TabPanel>
                    </TabContext>
                </div>

            </GeneralInner>
        </GeneralContainer>
    )
}

export default GeneralSettingsPage