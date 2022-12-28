import React from 'react'
import SellerSidebar from '../../../../Components/sidebar/SellerSidebar/SellerSidebar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Payment from './Payment';
import PaymentHistory from './Paymenhistory';
// import Return from './return';
// import Approved from './approved';
// import Rejected from './Rejected';

function ReturnPayment() {

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
            <div style={{ width: "100%" }} className="seller-dashboard-home">
                <SellerSidebar />
                <div className="seller-dashboard-homeContainer">
                    <div className="seller-dashboard-listContainer">
                        <div>
                            <Box sx={{ width: '100%' }}>
                                <div>
                                    <Box sx={{ borderBottom: 1, borderColor: '#AAAAAA' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab style={{ color: 'white' }} label="Payment" {...a11yProps(0)} />
                                            <Tab style={{ color: 'white' }} label="Payment History" {...a11yProps(1)} />
                                            {/* <Tab style={{ color: 'white' }} label="Rejected" {...a11yProps(2)} /> */}

                                        </Tabs>
                                    </Box>
                                </div>


                                <TabPanel value={value} index={0}>
                                   <Payment/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <PaymentHistory/>
                                </TabPanel>
                             
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default ReturnPayment