import React from 'react'
import SellerSidebar from '../../../Components/sidebar/SellerSidebar/SellerSidebar'
import RetrunHeader from './retrunHeader'

const ReturnHome = () => {
    return (<>
        <div style={{ width: "100%" }} className="seller-dashboard-home">
            <SellerSidebar />
            <div className="seller-dashboard-homeContainer">
                <div className="seller-dashboard-listContainer">
                    <RetrunHeader />
                </div>
            </div>
        </div>
    </>)
}

export default ReturnHome

