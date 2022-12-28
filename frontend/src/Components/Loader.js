import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ color }) => {
    return (
        <div style={{ height: "90vh", display: "flex" }}>

            <Spinner animation='border' role='status' style={{ color: color ? color : "black", margin: "auto", width: '50px', height: '50px' }}>
                <span className='sr-only'>Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader