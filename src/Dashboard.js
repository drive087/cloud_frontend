import React , { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard'
import CashierModal from './CashierModal.js'

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
  const [cart, setCart] = useState([]);
  // const [cart, setCart] = useState([])
  var endpoint = "http://ubuntu@ec2-13-250-20-113.ap-southeast-1.compute.amazonaws.com:8080/"
  // var cart = [{'name':'mama','amount':2}
  // , {'name':'lay','amount':1}]

  function onLogout(){
    localStorage.setItem('token', null);
    window.location.reload();
  }

  function onPurchase(){
    axios.post(endpoint+'purchase')
        .then(res=>{
          console.log(res)
        })
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

  

  useEffect(() => {
        const interval = setInterval(() => {
          axios.get(endpoint+'view')
          .then(res=>{
            let user_transaction = res.data.body.users
            var i;
            for (i = 0; i < user_transaction.length; i++) {
              let new_cart = []
              if(user_transaction[i]['username'] == username){
                var current_transaction = user_transaction[i]['transaction']
                for(var item in user_transaction[i]['transaction']){
                  new_cart.push({'name':item, 'amount':current_transaction[item][0]})
                }
              }
              setCart(new_cart)
            }
          })
        }, 1000);

        
    },[])

  if(username == null){
    return(<div>Loading</div>)
  }
  return (
    <div className="container">
      <div style={{marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <h2>
          รถเข็น
        </h2>
      </div>
      <div style={{justifyContent: 'center', alignItems: 'center' }}>
        {renderList(cart)}
      </div>
    
      <div className="PurchaseButton" onClick={()=>onPurchase()} style={{position:"absolute", bottom:0, marginBottom:"100px"}}>
        <p>ชำระเงิน</p>
      </div>
    </div>
  );
}

export default withRouter(Dashboard);


