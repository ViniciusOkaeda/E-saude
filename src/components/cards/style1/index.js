import React, {useState, useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
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
import axios from 'axios';
import './index.css';

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


  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#ff9393',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

const StyledCard1 = (svas) => {

    const [status, setStatus] = useState('');
    const [ svaId, setSvaId] = useState('');
    const [ svaName, setSvaName] = useState('');
    let modalOpenRef = useRef();
    const [ modalOpen, setModalOpen] = useState(false);
    const [ modalOpen2, setModalOpen2] = useState(false);
    const [ modalOpen3, setModalOpen3] = useState(false);
    const [ specificSva, setSpecificSva ] = useState({});

    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [errorState, setErrorState] = React.useState(false);
    const [sucessState, setSucessState] = React.useState(false);
    const [infoState, setInfoState] = React.useState(false);
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

      const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
      };

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

const handleModal = () => {
        setModalOpen(!modalOpen);
    }
const handleModal2 = () => {
    setModalOpen2(!modalOpen2);
}
const handleModal3 = () => {
    setModalOpen3(!modalOpen3);
}


    useEffect(() => {

        let handler = e => {
            if(!modalOpenRef.current.contains(e.target)){
                setModalOpen(false);
                setModalOpen3(false);
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
                window.location.href = '/produtodigital';
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
                window.location.href = '/produtodigital';
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
                window.location.href = '/produtodigital';
            } 
        })
        .catch((err) => {
            setError(err.response.data.response)
            setInfoState(false);
            setErrorState(true);

        });
    }


    async function deactiveTelemedicina() {
        setInfoState(true);
        apis.patch('sva/telemedicina', {
                token: sessionStorage.getItem('token'),
                svaid: parseInt(svaId),
                status: status
        }).then(function (response) {
            if(response.data.status === 1) {
                setInfoState(false);
                setSucessState(true);
                window.location.href = '/produtodigital';
            }
        }).catch(function (error) {
            setError(error);
            setInfoState(false);
            setErrorState(true);
            setLoading(false);
        })

    }
    async function deactiveSva() {
        setInfoState(true);
        apis.patch('sva', {
                token: sessionStorage.getItem('token'),
                svaid: parseInt(svaId),
                status: status
        }).then(function (response) {
            if(response.data.status === 1) {
                setInfoState(false);
                setSucessState(true);
                window.location.href = '/produtodigital';
            }
        }).catch(function (error) {
            setError(error);
            setInfoState(false);
            setErrorState(true);
            setLoading(false);
        })

    }


    return(
        <div className="containerStyledCard1">
            <table>
                <tr className="StyledBorder">
                    <th className="StyledTableImg">SVA</th>
                    <th className="StyledName">NOME</th>
                    <th className="StyledStatus">STATUS</th>
                    <th className="StyledStatus">AÇÕES</th>
                </tr>

                {svas.svas.map((sva, idx) => {

                    return(
                        <tr key={idx} className={`StyledStatusColor ${sva.status === "ACTIVE" ? "active" : "inactive"}`}>
                            <td className="StyledTableImg"><img src={sva.image} alt="SVA_Image"/> </td>
                            <td className="StyledName">{sva.name}</td>
                            <td className="StyledStatus"> 
                                <h4 >
                                    {sva.status === "INACTIVE" ? "Inativo" : "Ativo"}
                                </h4>
                            
                            </td>
                            <th className="StyledStatus">
                                {sva.status === "ACTIVE"
                                ?
                                <FormControlLabel
                                onClick={(() => {
                                    setStatus('DEACTIVATE');
                                    setSvaName(sva.name);
                                    setSvaId(sva.idsva);
                                    handleModal();
                            })} 
                                checked={true}
                                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                label="Desabilitar"
                              />
                                :
                                <FormControlLabel
                                onClick={(() => {
                                    if(sva.type === 'EXTERNO'){
                                        if(sva.extid === 'NOVO'){
                                            setSpecificSva(sva);
                                            handleModal2(); 
                                        }

                                        if(sva.extid === 'EXISTENTE') {
                                            setSpecificSva(sva);
                                            setStatus('ACTIVATE');
                                            handleModal3();
                                        }
                                        
                                    }  else {
                                        setSpecificSva(sva);
                                        setStatus('ACTIVATE');
                                        handleModal3(); 
                                    }
                            })} 
                                checked={false}
                                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                label="Habilitar"
                              /> 
                                }
                            </th>

                        </tr>
                    );
                })}

            </table>

            <div  className={`modalActiveSva ${modalOpen ? "active" : "inactive"}`}>
                <div ref={modalOpenRef} className="modalActiveSvaContainer">
                    <div className="modalActiveSvaContent1">
                        <h3>Deseja realmente desativar o SVA <span>{svaName}</span>?</h3>
                    </div>

                    <div className="modalActiveSvaContent2">
                        <button onClick={() => {
                            handleModal();
                        }}>Cancelar</button>

                        <button onClick={() => {
                           
                           if(svaName === 'Telemedicina') {
                            deactiveTelemedicina();
                           } else{
                            deactiveSva();
                           }
                           
                        }}>Desativar</button>
                    </div>

                </div> 
            </div>

            <div  className={`modalActiveSva ${modalOpen3 ? "active" : "inactive"}`}>
                <div ref={modalOpenRef} className="modalActiveSvaContainer">
                    <div className="modalActiveSvaContent1">
                        <h3>Deseja realmente ativar o SVA <span>{specificSva.name}</span>?</h3>
                    </div>

                    <div className="modalActiveSvaContent2">
                        <button onClick={() => {
                            handleModal3();
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

export default StyledCard1;