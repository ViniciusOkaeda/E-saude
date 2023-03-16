import React, {useState, useEffect} from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import './index.css';

const Menu = () => {


    return(
        <div className="containerMenu">
            <div className="containerMenu90">
                <div className="containerMenuLogo"></div>
                <div className="containerMenuLine"></div>

                <a>
                    <div className="containerMenuLinks">
                        <div className="containerMenuIcon"><DashboardIcon className="menuIcon" sx={{ fontSize: '1.6em'}}/></div>
                        <div className="containerMenuText"><p>Dashboard</p></div>
                    </div>
                </a>

                <a>
                    <div className="containerMenuLinks">
                        <div className="containerMenuIcon"><QueuePlayNextIcon className="menuIcon" sx={{ fontSize: '1.6em'}}/></div>
                        <div className="containerMenuText"><p>Produtos Digitais</p></div>
                    </div>
                </a>
                
                <a>
                    <div className="containerMenuLinks">
                        <div className="containerMenuIcon"><QueuePlayNextIcon className="menuIcon" sx={{ fontSize: '1.6em'}}/></div>
                        <div className="containerMenuText"><p>Telemedicina</p></div>
                    </div>
                </a>


            </div>
        </div>
    );
}

export default Menu;