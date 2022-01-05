import React, {useState} from "react";
import {Box, Container, Tab, Tabs} from "@mui/material";
import TabItem from "./TabItem";
import ChatView from "../../Chat/ChatView";
import {CAPTION_CHATS, CAPTION_GUESTS} from "../../Constants/TextMessagesRu";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MainTab = (props) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newIndex) => {
        console.log("tab index: "+newIndex);
        setTabIndex(newIndex);
    }

    return (
        <>
          <Container>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabIndex} onChange={handleChange} >
                      <Tab label={CAPTION_CHATS} {...a11yProps(0)} />
                      <Tab label={CAPTION_GUESTS} {...a11yProps(1)} />
                  </Tabs>
              </Box>
              <TabItem value={tabIndex} index={0}>
                  <ChatView/>
              </TabItem>
              <TabItem value={tabIndex} index={1}>
                  Гости
              </TabItem>
          </Container>
        </>
    );
}

export default MainTab;