import React, {useState, useEffect} from 'react';
import './index.css';
import Menu from '../../components/menu';
import StyleConfig from '../style/styleConfig';

const Dashboard = () => {


    return(
        <div className="content">

            <Menu />
            <StyleConfig />
            <div className="container"></div>

        </div>
    );
}

export default Dashboard;