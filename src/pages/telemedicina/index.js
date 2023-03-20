import React, {useState, useEffect} from 'react';
import './index.css';
import Menu from '../../components/menu';
import StyleConfig from '../../style/styleConfig';
import OptionsUser from '../../components/optionsUser';
import StyledCard2 from '../../components/cards/style2';
import axios from 'axios';

const Telemedicina = () => {
//https://lite.codedthemes.com/datta-able/react/default/dashboard/default#!

const [ svaList, setSvaList] = useState ([{
    idsva: '',
    image: '',
    name: '',
    status: ''
}])

const [ activeS, setActiveS ] = useState(null);
const [ inactiveS, setInactiveS ] = useState(null);

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

    let token = sessionStorage.getItem('token');

    (async () => {
        const result = await apis.get('sva', {
            params: {
                token: token
            }
        }).then((result) => {
            setSvaList(result.data.response)
        }).catch((error) => {
            console.log(error);
        })
    })();

    //console.log("o sva", svaList);

},[]);

    return(
        <div className="content">

            <Menu />
            <StyleConfig />
            <div className="container">

                <div className="headerContent">
                    <div className="headerContentTitle"><h2>Telemedicina</h2></div>
                    <div className="headerContentOptions"><OptionsUser /></div>
                </div>


            </div>

        </div>
    );
}

export default Telemedicina;