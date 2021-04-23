import React , { useState, useEffect } from 'react';
import './Login.css';
import FloatingLabelInput from 'react-floating-label-input';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import cashier from './img/cashier.png';




function Login(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);

  var endpoint = "http://ec2-13-213-29-64.ap-southeast-1.compute.amazonaws.com:8080/"


  function login(username,password,history){
      console.log(endpoint)
      axios.post(endpoint+`login`,
    { 
      'username':username,
      'password':password
    })
    .then(res=>{
      console.log(res)
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
