import React , { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import lay_img from './img/lay.jpeg'
import mama_img from './img/mama.jpeg'

function ItemImg(props) {
    const [name , setFirstName] = useState(props.name);
    const [amount, setAmount] = useState(props.amount)
    console.log(props)
    if(name == "lay"){
        return (
            <div>
                <p><img src={lay_img} width={40} height={40}/> x{amount}</p>
            </div>
           );
    }
    if(name == "mama"){
        return (
            <div>
                <p><img src={mama_img} width={40} height={40}/> x{amount}</p>
            </div>
           );
    }
    return (
       <img src={lay_img}/>
      );
}

export default withRouter(ItemImg);
