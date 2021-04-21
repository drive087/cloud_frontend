import React , { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  welcome: {
    margin: theme.spacing(1),
    marginLeft: 0,
    textTransform: 'capitalize',
    color: 'white',
    display: 'inline-flex',
    paddingLeft: '5%',
    alignItems: 'center'
  }
}));


function Dashboard(props) {
  const [username, setUsername] = useState(props.location.state.username);
  const [search, setSearch] = useState("");
  const [pageOffset, setPageOffset] = useState(0);
  // const [cart, setCart] = useState([])
  var cart = [{'name':'mama','amount':2}, {'name':'lay','amount':1}]

  function onLogout(){
    localStorage.setItem('token', null);
    window.location.reload();
  }

  function renderList(cart){
    console.log(cart)
    if(cart.length != 0){
      return(
        cart.map((item) => {
          return(
            <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <ItemCard item = {item}/>
            </div>
          )
        })
      )
      }

  }

  

//   useEffect(() => {

//         axios.get('http://localhost:8080/'+props.location.state._id+'/getpatients',
//         {
//           headers: { Authorization: `Token ${localStorage.getItem('token')}` }
//         })
//         .then(res=>{
//             if(res.status === 200){
//                 var patientlist = []
//                 for(var x in res.data){
//                   patientlist.push(res.data[x])
//                 }

//                 setPatient(patientlist);
//             }
//         })
//     },[])

  if(username == null){
    return(<div>Loading</div>)
  }
  return (
    <div className="container">
      <div style={{marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <h2>
          My Cart
        </h2>
      </div>
      <div style={{justifyContent: 'center', alignItems: 'center' }}>
        {renderList(cart)}
      </div>
      <div className="LogButton" style={{position:"absolute", bottom:0, marginBottom:"100px"}}>
        <p>Purchase</p>
      </div>
    </div>
  );
}

export default withRouter(Dashboard);
