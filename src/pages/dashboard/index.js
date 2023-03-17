import React, {useState, useEffect} from 'react';
import './index.css';
import Menu from '../../components/menu';
import StyleConfig from '../style/styleConfig';
import OptionsUser from '../../components/optionsUser';
import StyledCard1 from '../../components/cards/style1';

const Dashboard = () => {
//https://lite.codedthemes.com/datta-able/react/default/dashboard/default#!

    return(
        <div className="content">

            <Menu />
            <StyleConfig />
            <div className="container">

                <div className="headerContent">
                    <div className="headerContentTitle"><h2>Dashboard</h2></div>
                    <div className="headerContentOptions"><OptionsUser /></div>
                </div>


                <StyledCard1 />
                <StyledCard1 />
                <StyledCard1 />
                <StyledCard1 />
                <StyledCard1 />

            </div>

        </div>
    );
}

export default Dashboard;