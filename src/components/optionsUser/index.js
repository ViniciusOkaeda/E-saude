import { useEffect, useState, useRef } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import './index.css';


const OptionsUser = () => {
    let dropDownRef = useRef();
    //let profile = sessionStorage.getItem('profile');
    const [isActive, setIsActive] = useState(false);
    
    const handleOpenDropDown = () => setIsActive(!isActive);

    async function logout() {
        //sessionStorage.removeItem("token");
        //sessionStorage.removeItem("profile");
        //window.location.href = '/';
    }

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
        <div ref={dropDownRef} className="optionsContent">
            <div className="optionsContent2">
                <button onClick={handleOpenDropDown}>XX</button>
            </div>

            <nav 
                className={`options ${isActive ? "active" : "inactive"}`}
            >
                <ul>
                    <li onClick={logout}><LogoutIcon /><p>Sair</p></li>
                </ul> 
            </nav>
        </div>
    );
}

export default OptionsUser