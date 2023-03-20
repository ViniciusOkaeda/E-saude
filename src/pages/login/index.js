import React, {useState, useEffect} from 'react';
import Loader from '../../components/loader';
import api from '../../service/axios.js';
import ImgBgd from '../../assets/image_background.png';
import Video from '../../video/videoplayback.mp4'
import axios from 'axios';
import './index.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
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
        if(sessionStorage.getItem('idCompany')) {
            setVendorExists(true);
        }

        (async () => {
            const result = await apis.get('/parceiros', {
            }).then((result) => {
                setProvedorList(result.data.response)
            }).catch((error) => {
                console.log(error);
            })
        })();
    },[])

    async function login() {
        let login = username;
        let idcompany = parseInt(sessionStorage.getItem('idCompany'))
        apis.post('login', {idcompany, login, password})
            .then(function (response) {
                if(response.data.status === 1) {
                    setInfoState(true);
                    setLoading(false);
                    sessionStorage.setItem("token", response.data.response.token);
                    sessionStorage.setItem("profile", response.data.response.profileName);
                    window.location.href = '/dashboard';
                    setSucessState(true);
                }
                if(response.data.status === 11) {
                    setError(response.data.response);
                    setLoading(false);
                    setErrorState(true);

                }
                if(response.data.status === 13) {
                    setError(response.data.response);
                    setLoading(false);
                    setErrorState(true);

                }
        }).catch(function (error) {
            setError(error);
            setErrorState(true);
            setLoading(false);
          })

    }

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
                        <div className="configLoginBackground">
                            <video autoPlay muted>
                                <source src={Video} type="video/mp4" loop />
                            </video>
                        <div className="backgroundColor"></div>
                        </div>

                        <div className="configLoginForm">
                            <div className="loginContent">
                                <div className="loginContent1">
                                    <div className="contentLoginReturn" >
                                        <button onClick={handleOpenSelectVendor}><ArrowBackIcon style={{ marginTop: 3}}/></button>
                                    </div>
                                    <img src={sessionStorage.getItem('companyImg')}></img>
                                </div>

                                <div className="loginContent2">
                                    <h4>Você está a um passo de ativar seu produto digital!</h4>
                                    <h2>Entre com sua conta</h2>
                                </div>

                                <div className="loginForm">
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%'}}>
                                            <div>
                                                <TextField 
                                                    label="Username" 
                                                    id="outlined-size-normal" 
                                                    sx={{width: '100%', marginBottom: '3%'}}
                                                    onChange={e => setUsername(e.target.value)}
                                                />
                                                
                                                <FormControl sx={{width: '100%', marginBottom: '6%' }} variant="outlined">
                                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    onChange={e => setPassword(e.target.value)}
                                                    endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                                </FormControl>
                                            </div>
                                    </Box>

                                        <div className="contentLoginButton"> 
                                            <button type="submit" onClick={login}>Fazer Login</button>
                                        </div>
                                </div>
                            </div>

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