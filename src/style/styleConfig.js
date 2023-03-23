import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';

import './index.css';

const StyleConfig = () => {
    let dropDownRef = useRef();
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
                containerColor: '',
            }
        ],

        menuColor: [
            {
                type: '',
                color: '',
                fontColor: ''
            }
        ],

        menuStyle: [
            {
                menuWidth: '',
                menuHeight: '',
                menuMinHeight: '',
                menuDisplay: '',
                menuMargin: '',
            }
        ],

    }]);

    const [isActive, setIsActive] = useState(false);
    
    const handleOpenDropDown = () => setIsActive(!isActive);

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
            const currentContainerColor = localStorage.getItem('containerColor');
            setTheme(currentThemeColor, currentFontColor, currentFontColorAlternative, currentShadowColor, currentFontShadowColor, currentBorderColor, currentLineColor, currentContainerColor);



            const currentMenuColor = localStorage.getItem('menuColor');
            const currentMenuFontColor = localStorage.getItem('menuFontColor');
            setMenuColor(currentMenuColor, currentMenuFontColor);



            const currentMenuWidth = localStorage.getItem('menuWidth');
            const currentMenuHeight = localStorage.getItem('menuHeight');
            const currentMenuMinHeight = localStorage.getItem('menuMinHeight');
            const currentMenuDisplay = localStorage.getItem('menuDisplay');
            const currentMenuMargin = localStorage.getItem('menuMargin');
            setMenuStyle(currentMenuWidth, currentMenuHeight, currentMenuMinHeight, currentMenuDisplay, currentMenuMargin);

    

        let handler = (e) => {
            if(!dropDownRef.current.contains(e.target)){
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }




      },[])

    const setTheme = (themeColor, fontColor, fontColorAlternative, shadowColor, fontShadowColor, borderColor, lineColor, containerColor) => {
        document.documentElement.style.setProperty('--theme-color', themeColor);
        document.documentElement.style.setProperty('--font-color', fontColor);
        document.documentElement.style.setProperty('--font-color-alternative', fontColorAlternative);
        document.documentElement.style.setProperty('--shadow-color', shadowColor);
        document.documentElement.style.setProperty('--font-shadow-color', fontShadowColor);
        document.documentElement.style.setProperty('--border-color', borderColor);
        document.documentElement.style.setProperty('--line-color', lineColor);
        document.documentElement.style.setProperty('--container-color', containerColor);
    }

    const setPalette = (event) => {
        const currentThemeColor = event.target.style.getPropertyValue('--theme-color');
        const currentFontColor = event.target.style.getPropertyValue('--font-color');
        const currentFontColorAlternative = event.target.style.getPropertyValue('--font-color-alternative');
        const currentShadowColor = event.target.style.getPropertyValue('--shadow-color');
        const currentFontShadowColor = event.target.style.getPropertyValue('--font-shadow-color');
        const currentBorderColor = event.target.style.getPropertyValue('--border-color');
        const currentLineColor = event.target.style.getPropertyValue('--line-color');
        const currentContainerColor = event.target.style.getPropertyValue('--container-color');

        setTheme(currentThemeColor, currentFontColor, currentFontColorAlternative, currentShadowColor, currentFontShadowColor, currentBorderColor, currentLineColor, currentContainerColor);

        localStorage.setItem('themeColor', currentThemeColor);
        localStorage.setItem('fontColor', currentFontColor);
        localStorage.setItem('fontColorAlternative', currentFontColorAlternative);
        localStorage.setItem('shadowColor', currentShadowColor);
        localStorage.setItem('fontShadowColor', currentFontShadowColor);
        localStorage.setItem('borderColor', currentBorderColor);
        localStorage.setItem('lineColor', currentLineColor);
        localStorage.setItem('containerColor', currentContainerColor);

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

    const setMenuStyle = (menuWidth, menuHeight, menuMinHeight, menuDisplay, menuMargin) => {
        document.documentElement.style.setProperty('--menu-width', menuWidth);
        document.documentElement.style.setProperty('--menu-height', menuHeight);
        document.documentElement.style.setProperty('--menu-min-height', menuMinHeight);
        document.documentElement.style.setProperty('--menu-display', menuDisplay);
        document.documentElement.style.setProperty('--menu-margin', menuMargin);
    }

    const setMenuType = (event) => {
        const currentMenuWidth = event.target.style.getPropertyValue('--menu-width');
        const currentMenuHeight = event.target.style.getPropertyValue('--menu-height');
        const currentMenuMinHeight = event.target.style.getPropertyValue('--menu-min-height');
        const currentMenuDisplay = event.target.style.getPropertyValue('--menu-display');
        const currentMenuMargin = event.target.style.getPropertyValue('--menu-margin');

        setMenuStyle(currentMenuWidth, currentMenuHeight, currentMenuMinHeight, currentMenuDisplay, currentMenuMargin);

        localStorage.setItem('menuWidth', currentMenuWidth);
        localStorage.setItem('menuHeight', currentMenuHeight);
        localStorage.setItem('menuMinHeight', currentMenuMinHeight);
        localStorage.setItem('menuDisplay', currentMenuDisplay);
        localStorage.setItem('menuMargin', currentMenuMargin);

    }



    return(

        <div ref={dropDownRef}>
            <div className="configOpenOptions">
                <button onClick={handleOpenDropDown}><SettingsIcon className="configIcon"/> </button>
            </div>
            <div className={`containerStyle ${isActive ? "active" : "inactive"}`}>
                
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
                                        '--container-color': th.containerColor,
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
                <div className="contentStyed">
                    {configOptions.map(e => e.menuStyle.map((type, idx) => {

                        return(
                            <div key={idx} className="typeContent">

                                <div>
                                    <div className="typeContainer">
                                        <p  style={{
                                            '--menu-width': type.menuWidth,
                                            '--menu-height': type.menuHeight,
                                            '--menu-min-height': type.menuMinHeight,
                                            '--menu-display': type.menuDisplay,
                                            '--menu-margin': type.menuMargin
                                        }} 
                                        onClick={setMenuType}>Type {idx+1}</p>
                                    </div>
                                </div>

                            </div>
                        )
                    }))

                    }
                </div>

            </div>
        </div>
    );
}

export default StyleConfig;