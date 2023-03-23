import React, {useState, useEffect} from 'react';
import './index.css';
import Menu from '../../components/menu';
import StyleConfig from '../../style/styleConfig';
import OptionsUser from '../../components/optionsUser';
import StyledCard1 from '../../components/cards/style1';
import PieChartZ from '../../components/charts/index.tsx';
import axios from 'axios';

const Dashboard = () => {
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
            setActiveS(result.data.response.filter(e => e.status === "ACTIVE").map(e => e).length);
            setInactiveS(result.data.response.filter(e => e.status === "INACTIVE").map(e => e).length);
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
                    <div className="headerContentTitle"><h2>Dashboard</h2></div>
                    <div className="headerContentOptions"><OptionsUser /></div>
                </div>

                <div className="contentDisplay">
                    <PieChartZ svasList={svaList} />
                    <StyledCard1 svas={svaList}/>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;