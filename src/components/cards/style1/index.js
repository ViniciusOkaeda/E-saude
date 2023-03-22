import React, {useState, useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './index.css';

const StyledCard1 = (svas) => {

    const [status, setStatus] = useState('');
    const [ svaId, setSvaId] = useState('');
    const [ svaName, setSvaName] = useState('');
    let modalOpenRef = useRef();
    const [ modalOpen, setModalOpen] = useState(false);

    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [errorState, setErrorState] = React.useState(false);
    const [sucessState, setSucessState] = React.useState(false);
    const [infoState, setInfoState] = React.useState(false);

const handleModal = () => {
        setModalOpen(!modalOpen);
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
                window.location.href = '/dashboard';
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
                window.location.href = '/dashboard';
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
                                <button style={{ width: '50px'}} 
                                onClick={(() => {
                                        setStatus('DEACTIVATE');
                                        setSvaName(sva.name);
                                        setSvaId(sva.idsva);
                                        handleModal();
                                })} 
                                
                                >AQ</button>
                                :
                                '' 
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