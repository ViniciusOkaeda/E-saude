import React, {useState, useEffect} from 'react';
import './index.css';
import Menu from '../../components/menu';
import StyleConfig from '../style/styleConfig';
import StyledCard1 from '../../components/cards/style1';

const Dashboard = () => {
//https://lite.codedthemes.com/datta-able/react/default/dashboard/default#!

    return(
        <div className="content">

            <Menu />
            <StyleConfig />
            <div className="container">
                <StyledCard1 />

            </div>

        </div>
    );
}

export default Dashboard;