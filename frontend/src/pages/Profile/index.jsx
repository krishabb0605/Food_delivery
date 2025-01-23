import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { MyDetails, UpdatePassword } from '../../components';

const Profile = ({ tabProps }) => {
  return (
    <Tabs variant='enclosed' colorScheme='orange' {...tabProps} isFitted>
      <TabList>
        <Tab>My Details</Tab>
        <Tab>Password</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MyDetails />
        </TabPanel>
        <TabPanel>
          <UpdatePassword />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Profile;
