import React, {useState, useEffect, useRef} from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import OptionsUser from '../optionsUser';
import MenuIcon from '@mui/icons-material/Menu';
import './index.css';

const Menu = () => {
    let dropDownRef = useRef();
    let companyImg = sessionStorage.getItem('companyImg')
    const [isActive, setIsActive] = useState(false);
    
    const handleOpenDropDown = () => setIsActive(!isActive);

    useEffect(() => {
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


    return(
        <>
            <div className="containerMenu">
                <div className="containerMenu90">
                    <div className="containerMenuLogo">
                        <img src={companyImg}></img>
                    </div>
                    
                    <div className="containerMenuLine"></div>

                    <a href='/dashboard'>
                        <div className="containerMenuLinks">
                            <div className="containerMenuIcon"><AppsIcon className="menuIcon" sx={{ fontSize: '1.6em'}}/></div>
                            <div className="containerMenuText"><p>Produto Digital</p></div>
                        </div>
                    </a>


                </div>
            </div>

            <div className="containerMenuMobile">
            <div ref={dropDownRef} className="menuConfigItemsMobile">
                    <MenuIcon onClick={handleOpenDropDown} className="menuIconMobile" sx={{ fontSize: '2.1em'}}/>
                    <nav 
                        className={`optionsMobile ${isActive ? "active" : "inactive"}`}
                    >
                        <ul>
                            <a href="/dashboard"><li><AppsIcon /><p>Produto Digital</p></li></a>
                        </ul> 
                    </nav>
                </div>


                <div className="menuConfigItemsMobile">
                    <div className="menuContentUserOptions"><OptionsUser /></div>
                </div>
            </div>
        
        </>
    );
}

export default Menu;