import React, {useState, useRef, useEffect} from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import './index.css'
import axios from 'axios';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#0) 00000-0000"
        definitions={{
          '#': /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

const TextMaskCustom2 = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#00.000.000-00"
        definitions={{
          '#': /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  TextMaskCustom2.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
const TextMaskCustom3 = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#0000-000"
        definitions={{
          '#': /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  TextMaskCustom3.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

const StyledCard2 = (svas) => {
    let modalOpenRef = useRef();
    const [ modalOpen, setModalOpen] = useState(false);
    const [ modalOpen2, setModalOpen2] = useState(false);
    const [ specificSva, setSpecificSva ] = useState({});
    const [values, setValues] = React.useState({
        token: '',
        svaid: '',
        name: '',
        cpf: '',
        birthday: '',
        phone: '',
        email: '',
        zipcode: '',
        address: '',
        city: '',
        state: '',
      });

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');



      const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
      };


    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [errorState, setErrorState] = React.useState(false);
    const [sucessState, setSucessState] = React.useState(false);
    const [infoState, setInfoState] = React.useState(false);

const handleModal = () => {
        setModalOpen(!modalOpen);
    }
const handleModal2 = () => {
        setModalOpen2(!modalOpen2);
    }


    useEffect(() => {

        let handler = e => {
            if(!modalOpenRef.current.contains(e.target)){
                setModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }

    }, [])

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


    async function activeSva() {
        setInfoState(true);
        apis.patch('sva', {
                token: sessionStorage.getItem('token'),
                svaid: parseInt(specificSva.idsva),
                status: "ACTIVATE"
        }).then(function (response) {
            if(response.data.status === 1) {
                setInfoState(false);
                setSucessState(true);
                window.location.href = '/dashboard';
            }
        }).catch(function (error) {
            setError(error);
            setInfoState(false);
            setErrorState(true);
            setLoading(false);
        })

    }

    async function activeSvaAgain() {
        setInfoState(true);
        apis.patch('sva/telemedicina', {
                token: sessionStorage.getItem('token'),
                svaid: parseInt(specificSva.idsva),
                status: "ACTIVATE"
        }).then(function (response) {
            if(response.data.status === 1) {
                setInfoState(false);
                setSucessState(true);
                window.location.href = '/dashboard';
            }
        }).catch(function (error) {
            setError(error);
            setInfoState(false);
            setErrorState(true);
            setLoading(false);
        })

    }

    async function activeExternalSva() {
        setInfoState(true);
        setErrorState(false);
        apis.post("sva/telemedicina", {
            token: sessionStorage.getItem('token'),
            svaid: parseInt(specificSva.idsva),
            name: values.name,
            cpf: values.cpf.replace(/[^0-9]/g, ''),
            birthday: day + "/" + month + "/" + year,
            phone: values.phone.replace(/[^0-9]/g, ''),
            email: values.email,
            zipcode: values.zipcode,
            address: values.address,
            city: values.city,
            state: values.state
        })  
        .then(function (response) {
            if(response.data.status === 1) {
                setInfoState(false);
                setSucessState(true);
                window.location.href = '/dashboard';
            } 
        })
        .catch((err) => {
            setError(err.response.data.response)
            setInfoState(false);
            setErrorState(true);

        });
    }

    return(
        <div className="StyledContainer2">
            {svas.svas.filter(e => e.status === "INACTIVE").map((sva, idx) => {
                return(
                    <div key={idx} className="ContentStyled2">
                        <div className="ContainerStyled2">

                            <div className="ContainerStyledImage2">
                                <div className="StyledImage">
                                    <img src={sva.image} alt="SVA Image"/>
                                </div>
                            </div>

                            <div className="ContainerStyledHeader2">
                                <h2>{sva.name}</h2>
                                <button onClick={(() => {
                                    if(sva.type === 'EXTERNO'){
                                        if(sva.extid === 'NOVO'){
                                            setSpecificSva(sva);
                                            handleModal2(); 
                                        }

                                        if(sva.extid === 'EXISTENTE') {
                                            setSpecificSva(sva);
                                            handleModal();
                                        }
                                        
                                    }  else {
                                        setSpecificSva(sva);
                                        handleModal(); 
                                    }
                                })}>Habilitar SVA</button>
                            </div>

                        </div>



                    </div>
                );
            })}

            <div  className={`modalActiveSva ${modalOpen ? "active" : "inactive"}`}>
                <div ref={modalOpenRef} className="modalActiveSvaContainer">
                    <div className="modalActiveSvaContent1">
                        <h3>Deseja realmente ativar o SVA <span>{specificSva.name}</span>?</h3>
                    </div>

                    <div className="modalActiveSvaContent2">
                        <button onClick={() => {
                            handleModal();
                        }}>Cancelar</button>

                        <button onClick={() => {
                        
                            if(specificSva.name === 'Telemedicina') {
                                activeSvaAgain();
                            } else {
                                activeSva();
                            }

                        }}>Ativar</button>
                    </div>

                </div> 
            </div>

            <div className={`modalActiveSva2 ${modalOpen2 ? "active" : "inactive"}`}>
                <div className="modalActiveSvaContainer2">
                <div className="modalActiveSva2Content1">
                        <h3><span>{specificSva.name}</span> - Preencha o Formulário</h3>
                    </div>

                    <div className="modalForm"> 
                        <Box
                            sx={{
                                alignItems: 'center',
                                width: '100%',
                                '& > :not(style)': { m: 1 },
                            }}
                            >
                            <TextField sx={{width: '55%'}}
                                helperText="Digite seu Nome. Ex: Alberto Júnior"
                                id="demo-helper-text-aligned"
                                label="Nome"
                                name="name"
                                onChange={handleChange}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                label="Data Nasc." 
                                sx={{width: '35%'}} 
                                format="DD/MM/YYYY"
                                onChange={(date) => {
                                    setDay(date.$D);
                                    setMonth(date.$M + 1);
                                    setYear(date.$y);
                                }}
                                />
                            </LocalizationProvider>

                            <FormControl variant="standard" sx={{width: '92%',}} >
                                <InputLabel htmlFor="formatted-text-mask-input" sx={{paddingLeft: 1.5}}>CPF</InputLabel>
                                <OutlinedInput
                                name="cpf"
                                value={values.cpf}
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustom2}
                                onChange={handleChange}
                                
                                />
                                <FormHelperText sx={{paddingLeft: 1.5}}>Digite seu cpf. Ex: 12345678910</FormHelperText>
                            </FormControl>

                            <TextField
                                id="demo-helper-text-aligned-no-helper"
                                helperText="Digite seu email. Ex: usuario@gmail.com"
                                label="Email"
                                name="email"
                                sx={{width: '55%'}}
                                onChange={handleChange}
                            />

                            <FormControl variant="standard">
                                <InputLabel htmlFor="formatted-text-mask-input" sx={{paddingLeft: 1.5}}>Telefone</InputLabel>
                                <OutlinedInput
                                name="phone"
                                value={values.phone}
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustom}
                                sx={{width: '90%'}}
                                onChange={handleChange}
                                />
                                <FormHelperText sx={{paddingLeft: 1.5}}>Digite seu tel. Ex: (11) 99999-9999</FormHelperText>

                            </FormControl>

                            <FormControl variant="standard">
                                <InputLabel htmlFor="formatted-text-mask-input" sx={{paddingLeft: 1.5}}>CEP</InputLabel>
                                <OutlinedInput
                                name="zipcode"
                                value={values.zipcode}
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustom3}
                                sx={{width: '90%'}}
                                onChange={handleChange}
                                />
                                <FormHelperText sx={{paddingLeft: 1.5}}>Digite seu cep. Ex: 09999-299</FormHelperText>
                            </FormControl>

                            <TextField
                                id="demo-helper-text-aligned-no-helper"
                                label="Endereço"
                                name="address"
                                helperText="Digite seu endereço. Ex: Rua Amaral Neto"
                                sx={{width: '50%'}}
                                onChange={handleChange}
                            />
                            <TextField
                                id="demo-helper-text-aligned-no-helper"
                                label="Cidade"
                                name="city"
                                helperText="Digite sua cidade. Ex: São Paulo"
                                sx={{width: '50%'}}
                                onChange={handleChange}
                            />
                            <TextField
                                id="demo-helper-text-aligned-no-helper"
                                label="Estado (UF)"
                                name="state"
                                helperText="Digite seu estado. Ex: SP"
                                sx={{width: '32%'}}
                                onChange={handleChange}
                            />

                        </Box>
                    </div>

                    <div className="modalActiveSva2Content2">
                        <button onClick={() => {
                            handleModal2()
                        }}>Cancelar</button>

                        <button type="submit" onClick={() => {
                            activeExternalSva();
                        }}>Salvar</button>
                    </div>
                </div>
            </div>





            <Box className='returnInfoButtons'>
                <Collapse in={errorState}>
                    <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setErrorState(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    {error && <div className="error">{error}</div>}
                    </Alert>
                </Collapse>
                <Collapse in={infoState}>
                    <Alert
                    severity="warning"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setInfoState(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    <p className="info">
                    SVA sendo ativado, aguarde um momento...
                    </p>
                    </Alert>
                </Collapse>
                <Collapse in={sucessState}>
                    <Alert
                    severity="success"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setSucessState(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    <p className="success">
                    SVA ativado com sucesso! Você já pode utilizar o seu SVA.
                    </p>
                    </Alert>
                </Collapse>
            </Box>
        </div>
    );
}

export default StyledCard2; 