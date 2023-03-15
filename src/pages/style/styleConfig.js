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
                color: '',
                colorAlternative: '',
                shadowColor: '',
                fontShadowcolor: '',
                borderColor: '',
            }
        ],

        menuColor: [
            {
                type: '',
                color: '',
                fontColor: ''
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

            const currentThemeColor = localStorage.getItem('themeColor');
            const currentFontColor = localStorage.getItem('fontColor');
            const currentFontColorAlternative = localStorage.getItem('fontColorAlternative');
            const currentShadowColor = localStorage.getItem('shadowColor');
            const currentFontShadowColor = localStorage.getItem('fontShadowColor');
            const currentBorderColor = localStorage.getItem('borderColor');
            const currentLineColor = localStorage.getItem('lineColor');
            setTheme(currentThemeColor, currentFontColor, currentFontColorAlternative, currentShadowColor, currentFontShadowColor, currentBorderColor, currentLineColor);



            const currentMenuColor = localStorage.getItem('menuColor');
            const currentMenuFontColor = localStorage.getItem('menuFontColor');
            setMenuColor(currentMenuColor, currentMenuFontColor)
    


      },[])

      const setTheme = (themeColor, fontColor, fontColorAlternative, shadowColor, fontShadowColor, borderColor, lineColor) => {
        document.documentElement.style.setProperty('--theme-color', themeColor);
        document.documentElement.style.setProperty('--font-color', fontColor);
        document.documentElement.style.setProperty('--font-color-alternative', fontColorAlternative);
        document.documentElement.style.setProperty('--shadow-color', shadowColor);
        document.documentElement.style.setProperty('--font-shadow-color', fontShadowColor);
        document.documentElement.style.setProperty('--border-color', borderColor);
        document.documentElement.style.setProperty('--line-color', lineColor);
    }

    const setPalette = (event) => {
        const currentThemeColor = event.target.style.getPropertyValue('--theme-color');
        const currentFontColor = event.target.style.getPropertyValue('--font-color');
        const currentFontColorAlternative = event.target.style.getPropertyValue('--font-color-alternative');
        const currentShadowColor = event.target.style.getPropertyValue('--shadow-color');
        const currentFontShadowColor = event.target.style.getPropertyValue('--font-shadow-color');
        const currentBorderColor = event.target.style.getPropertyValue('--border-color');
        const currentLineColor = event.target.style.getPropertyValue('--line-color');

        setTheme(currentThemeColor, currentFontColor, currentFontColorAlternative, currentShadowColor, currentFontShadowColor, currentBorderColor, currentLineColor);

        localStorage.setItem('themeColor', currentThemeColor);
        localStorage.setItem('fontColor', currentFontColor);
        localStorage.setItem('fontColorAlternative', currentFontColorAlternative);
        localStorage.setItem('shadowColor', currentShadowColor);
        localStorage.setItem('fontShadowColor', currentFontShadowColor);
        localStorage.setItem('borderColor', currentBorderColor);
        localStorage.setItem('lineColor', currentLineColor);

    }



    const setMenuColor = (menuColor, menuFontColor) => {
        document.documentElement.style.setProperty('--menu-color', menuColor);
        document.documentElement.style.setProperty('--font-menu-color', menuFontColor);
    }

    const setPaletteMenu = (event) => {
        const currentMenuColor = event.target.style.getPropertyValue('--menu-color');
        const currentMenuFontColor = event.target.style.getPropertyValue('--font-menu-color');

        setMenuColor(currentMenuColor, currentMenuFontColor);

        localStorage.setItem('menuColor', currentMenuColor);
        localStorage.setItem('menuFontColor', currentMenuFontColor);

    }



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
                                    '--font-color': th.fontColor,
                                    '--font-color-alternative': th.fontColorAlternative,
                                    '--shadow-color': th.shadowColor,
                                    '--font-shadow-color': th.fontShadowColor,
                                    '--border-color': th.borderColor,
                                    '--line-color': th.lineColor,
                                }} onClick={setPalette}>

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
                                        '--font-menu-color': mn.fontColor,
                                    }}
                                    onClick={setPaletteMenu}
                                    >

                                    </div>
                                </div>
                            </div>
                        )
                }))}            
            </div>

            <div className="headerStyled">
                <h2>
                    Layout Menu
                </h2>
            </div>
            <div className="contentStyed"> </div>


        
            <div className="headerStyled">
                <h2>
                    Layout Menu
                </h2>
            </div>
            <div className="contentStyed"> </div>
        </div>
    );
}

export default StyleConfig;