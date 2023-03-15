import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import "./navigation.css"

const Navigation = () => {
    return (
        <>
            <div className="navigation">
                <div className="navigation-links-container">
                    <Link className="logo" to="/">
                        <h1>Expence Tracker</h1>
                    </Link>
                    <Link className='nav-link' to="/graph">
                        graph
                    </Link>
                    <Link className='nav-link' to="/pay">
                        Total Bills
                    </Link>
                </div>

            </div>
            <Outlet />
        </>
    )
}

export default Navigation