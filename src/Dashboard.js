import React , { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard'
import CashierModal from './CashierModal.js'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

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
  const [totalPrice, setTotalPrice] = useState(0);

  const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })
  // const [cart, setCart] = useState([])
  var endpoint = "http://ec2-54-251-164-227.ap-southeast-1.compute.amazonaws.com:8080/"
  // var cart = [{'name':'mama','amount':2}
  // , {'name':'lay','amount':1}]

  function onLogout(){
    localStorage.setItem('token', null);
    window.location.reload();
  }

  function onPurchase(){
    // onShowAlert('success')
    var n = totalPrice.toString();
    console.log(n)
    let purchase_aleart = 'ชำระเงินจำนวน ' + {n} + ' บาทเรียบร้อย\n ระบบได้ส่งใบเสร็จการชำระเงินไปที่'+ {username} +'เรียบร้อย'
    window.alert(purchase_aleart)
    axios.post(endpoint+'purchase')
        .then(res=>{
          console.log(res)
        })
  }
  function onCloseAlert() {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  function onShowAlert(type) {
    setAlert({
      type: type,
      text: 'Demo alert',
      show: true
    })
  }

  function renderList(cart){
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
      else{
        return(
          <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <p>----ตระกร้ายังว่าง เหมือนหัวใจเรา(;w;)----</p>
          </div>
        )
      }
  }

  

  useEffect(() => {
        const interval = setInterval(() => {
            axios.get(endpoint+'view')
          .then(res=>{
            let user_transaction = res.data.body.users
            let total_price = 0
            var i;
            for (i = 0; i < user_transaction.length; i++) {
              let new_cart = []
              if(user_transaction[i]['username'] == username){
                var current_transaction = user_transaction[i]['transaction']
                for(var item in user_transaction[i]['transaction']){
                  new_cart.push({'name':item, 'amount':current_transaction[item][0], 'price':current_transaction[item][1]})
                  total_price = total_price + (current_transaction[item][1]*current_transaction[item][0])
                }
                setTotalPrice(total_price)
              }
              setCart(new_cart)
              console.log(new_cart)
            }
          })
          
        }, 5000);
    },[])

  if(username == null){
    return(<div>Loading</div>)
  }
  return (
    <div className="container">
      <div style={{marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <h2>
          ตระกร้า
        </h2>
      </div>
      <div style={{justifyContent: 'center', alignItems: 'center' }}>
        {renderList(cart)}
      </div>

      {/* <Card style={{ marginBottom: '10px', height: '100px', width: '350px', backgroundColor: '#FFFFFF', opacity: '80%', borderRadius: '15px', justifyContent: 'center',alignItems: 'center'}}> */}
      <Card style={{position:"absolute", bottom:0, marginBottom:"80px",  height: '100px', width: '350px', backgroundColor: '#FFFFFF', opacity: '80%', borderRadius: '15px', justifyContent: 'center',alignItems: 'center'}}>
            <Grid container spacing={1} style={{justifyContent: 'center',alignItems: 'center'}}>
                <Grid container item xs={12} spacing={3} direction="row">
                    <Grid item xs>
                        <h3>Total</h3>
                    </Grid>
                    <Grid item xs style={{ marginLeft:"120px"}}>
                        <p>{totalPrice} บาท</p>
                    </Grid>
                </Grid>
                <div className="PurchaseButton" onClick={()=>onPurchase()} style={{position:"absolute", bottom:0, marginBottom:"10px"}}>
                  <p>ชำระเงิน</p>
                </div>
            </Grid>
        </Card>
      {/* <div>
        <p style={{marginRight:"80px", display:"inline"}}>ราคารวม</p><p style={{marginRight:"5px", display:"inline"}}>{toalPrice} Baht</p>
      </div> */}
      {/* <div className="PurchaseButton" onClick={()=>onPurchase()} style={{position:"absolute", bottom:0, marginBottom:"80px"}}>
        <p>ชำระเงิน</p>
      </div> */}
    </div>
  );
}

export default withRouter(Dashboard);


