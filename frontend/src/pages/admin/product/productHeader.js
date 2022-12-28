import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Allproducts from './AllProducts';
import UnApprovedProduct from './Unapprovedproducts';




const ProductHeader = () => {

    
    
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

      const [seller,setSeller]= useState([]);
    // const {name}=users;

    
    

      return (
        <>
            <div>
            <Box sx={{ width: '100%' }}>
                <div>
                    <Box  sx={{ borderBottom: 1, borderColor: '#AAAAAA'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab style={{color:'white'}}  label="All Products" {...a11yProps(0)} />
                        <Tab style={{color:'white'}} label="Unapproved product" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
               </div>
 
                    
                <TabPanel  value={value} index={0}>
                    <Allproducts />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <UnApprovedProduct />
                </TabPanel>
        </Box>
            </div>
        </>
      );
    }
    

export default ProductHeader

