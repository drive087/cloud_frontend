import React , { useState, useEffect } from 'react';
import './Login.css';
import FloatingLabelInput from 'react-floating-label-input';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import resgister from './img/res4.png';




function Login(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);

  useEffect(() => {

    if (localStorage.getItem('token') != "null"){
      console.log('useEff')

      axios.get('http://localhost:8080/register',
      {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      })
      .then(res=>{
          if(res.status === 200){
            setUser(res.data.user.username) 
            props.history.push({
              pathname:'/Dashboard',
              state: { username: res.data.user.username,_id: res.data.user._id}
            });
          }
      })
    }

  },[])


  function onRegister(history){
    history.push({
      pathname:'/Register'
    });
  }
 
  return (
    <div className="container" >
        <img 
        className = "logo"
        src={resgister} 
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
        onClick={()=>onRegister(username,password,props.history)}>
          <p>สมัครสมาชิก</p>
        </div>
        </div>
    </div>
  );
}

export default withRouter(Login);
