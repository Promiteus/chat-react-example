import React, {useState} from "react";
import {Box, Container, Tab, Tabs} from "@mui/material";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MainTab = (props) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (value) => {
        console.log("tab index: "+value);
    }

    return (
        <>
          <Container>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabIndex} onChange={handleChange} >
                      <Tab label="Item One" {...a11yProps(0)} />
                      <Tab label="Item Two" {...a11yProps(1)} />
                      <Tab label="Item Three" {...a11yProps(2)} />
                  </Tabs>
              </Box>
          </Container>
        </>
    );
}

export default MainTab;