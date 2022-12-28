import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Return from './return';
import Approved from './approved';
import Rejected from './Rejected';

const RetrunHeader = () => {

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div>
                <Box sx={{ width: '100%' }}>
                    <div>
                        <Box sx={{ borderBottom: 1, borderColor: '#AAAAAA' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab style={{ color: 'white' }} label="Requests" {...a11yProps(0)} />
                                <Tab style={{ color: 'white' }} label="Approved" {...a11yProps(1)} />
                                <Tab style={{ color: 'white' }} label="Rejected" {...a11yProps(2)} />
                              
                            </Tabs>
                        </Box>
                    </div>


                    <TabPanel value={value} index={0}>
                        {/* <CreateProduct /> */}
                        <Return/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Approved />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Rejected/>
                    </TabPanel>
                    
                </Box>
            </div>
        </>
    )
}

export default RetrunHeader;