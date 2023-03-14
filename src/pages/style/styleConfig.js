import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './index.css';

const StyleConfig = () => {
    const [configOptions, setConfigOptions ] = useState([{

        primaryColor: [
            {
                color: ''
            }
        ],

        themeColor: [
            {
                type: '',
                color: ''
            }
        ],

        menuColor: [
            {
                type: '',
                color: ''
            }
        ],

    }]);

    console.log("o config", configOptions);

      useEffect (() => {
        fetch('themeOptions.json', {
            headers: {
                Accept: "application/json"
            }
        }).then(res => 
            res.json()
            ).then(resp => {
                setConfigOptions(resp.paletteOptions.map(e => e))
               // console.log("o resp", resp.paletteOptions.map(e => e));
            }).catch((error) => {

            });
      },[])



    return(
        <div className="containerStyle">
            
            <div className="headerStyled">
                <h2>
                    Theme Mode
                </h2>
            </div>
            <div className="contentStyed">
                {configOptions.map(e => e.themeColor.map((th,idx) => {
                    return(
                        <div key={idx} className="themeContent">
                            
                            <div>
                                <p>{th.type}</p>

                                <div className="themeContainer" style={{
                                    '--theme-color': th.color,
                                }}>

                                </div>
                            </div>
                        </div>
                    )
                }))}
            </div>


            <div className="headerStyled">
                <h2>
                    Menu Background
                </h2>
            </div>
            <div className="contentStyed" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}> 
                {configOptions.map(e => e.menuColor.map((mn,idx) => {
                        return(
                            <div key={idx} className="menuContent">
                                
                                <div>

                                    <div className="menuContainer" style={{
                                        '--menu-color': mn.color,
                                    }}>

                                    </div>
                                </div>
                            </div>
                        )
                }))}            
            </div>

            
            <div className="contentStyed"> </div>
        </div>
    );
}

export default StyleConfig;