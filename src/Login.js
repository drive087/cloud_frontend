import React , { useState, useEffect } from 'react';
import './Login.css';
import FloatingLabelInput from 'react-floating-label-input';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import cashier from './img/cashier.png';




function Login(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);

  var dummy_email = "drive"
  var dummy_pass = "123456"
  var endpoint = "http://ubuntu@ec2-13-250-20-113.ap-southeast-1.compute.amazonaws.com:8080/"

  // useEffect(() => {

  //   if (localStorage.getItem('token') != "null"){
  //     console.log('useEff')

  //     axios.get('http://localhost:8080/login',
  //     {
  //       headers: { Authorization: `Token ${localStorage.getItem('token')}` }
  //     })
  //     .then(res=>{
  //         if(res.status === 200){
  //           setUser(res.data.user.username) 
  //           props.history.push({
  //             pathname:'/Dashboard',
  //             state: { username: res.data.user.username,_id: res.data.user._id}
  //           });
  //         }
  //     })
  //   }

  // },[])

  function login(username,password,history){
      axios.post(endpoint+'login',
    { 
      'username':username,
      'password':password
    })
    .then(res=>{
      if(res.data.statusCode == 200){
        window.alert('Login Success!!')
        history.push({
              pathname:'/Dashboard',
              state: { username: username}
            });
      }
      else{
            window.alert('Please check username or password')
        }
  })
  }

  function register(username,password){
    axios.post(endpoint+'register',
    { 
      'username':username,
      'password':password
    })
    .then(res=>{
      console.log(res)
      if(res.status === 200){
        window.alert('Success!!')
        setUser('')
        setPass('')
      }
  })

  }
 
  return (
    <div className="container" >
        <img 
        className = "logo"
        src={cashier} 
        width="200x" 
        height="200px"
        />
      <div className="inputContainer" style={{height:'200px'}}>
        <FloatingLabelInput
          label="ชื่อผู้ใช้"
          id="username"
          className="input"
          onChange={event =>setUser(event.target.value)}
          value={username}
        />
        <FloatingLabelInput
          label="รหัสผ่าน"
          id="password"
          className="input"
          onChange={event =>setPass(event.target.value)}
          type="password"
          value={password}
        />
      </div>
      <div>
        <div className="RegisterButton"
        onClick={()=>register(username,password)}>
          <p>สมัครสมาชิก</p>
        </div>
        <div className="LogButton"
        onClick={()=>login(username,password,props.history)}>
          <p>เข้าสู่ระบบ</p>
        </div>
        </div>
    </div>
  );
}

export default withRouter(Login);
