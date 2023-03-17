import React, {useState, useEffect} from 'react';
import Loader from '../../components/loader';
import api from '../../service/axios.js';
import ImgBgd from '../../assets/image.jpeg';
import axios from 'axios';
import './index.css';

const Login = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ctoken = urlParams.get("ctoken");
    const bannerId = urlParams.get("advert");
    const companyName = urlParams.get("company");

    const [ userByBanner, setUserByBanner ] = React.useState(true);
    const [ userByWeb, setUserByWeb ] = React.useState(false);

    const [ vendorExists, setVendorExists ] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const [ provedorList, setProvedorList] = useState ([{
        id: '',
        name: '',
        image: '',
    }])

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [errorState, setErrorState] = React.useState(false);
    const [sucessState, setSucessState] = React.useState(false);
    const [infoState, setInfoState] = React.useState(false);

    const handleCloseSelectVendor = () => {
        setVendorExists(true);
    };
    const handleOpenSelectVendor = () => {
        localStorage.clear();
        sessionStorage.clear();
        setVendorExists(false);
    };

    const apis = axios.create({
        baseURL: 'https://ativacao.youcast.tv.br/api/v1/internal/',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
        }
      })

    useEffect(() => {
        (async () => {
            const result = await apis.get('/parceiros', {
            }).then((result) => {
                setProvedorList(result.data.response)
            }).catch((error) => {
                console.log(error);
            })
        })();
    },[])

    return(
        <div >
            <div className={`renderSelect ${userByWeb === false ? "active" : "inactive"}`}>
                {vendorExists === false
                    ?
                        <div className="configPage">
                            <h1 className="heading">Selecione seu Provedor</h1>

                            <div className="configGrid">
                                {provedorList.map((pvd, idx) => {

                                    return(
                                        <div key={idx} className="gridItem" onClick={(() => {
                                            handleCloseSelectVendor();
                                            sessionStorage.setItem("idCompany", pvd.id);
                                            sessionStorage.setItem("companyImg", pvd.image);
                                            })}>
                                            <img src={pvd.image} />
                                        </div>
                                    )
                                })}


                            </div>
                        </div>
                    :
                    <div className="configLogin">
                        <div className="configLoginBackground"></div>

                        <div className="configLoginForm">
                            <div className="loginContent"></div>

                            <div className="loginBackgroundImage">
                                <div className="shadow" style={{
                                    backgroundImage: `url(${ImgBgd})`,
                                }}></div>
                            </div>

                        </div>

                    </div>
                }
            </div>

        </div>
    );
}

export default Login;