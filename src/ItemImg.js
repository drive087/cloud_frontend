import React , { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import lay_img from './img/lay.jpeg'
import mama_img from './img/mama.jpeg'
import milo_img from './img/milo.jpeg'
import homey_img from './img/homey.jpeg'
import pepsi_img from './img/pepsi.jpeg'
import rosa_img from './img/rosa.jpeg'
import waiwai_img from './img/waiwai.jpeg'
import chang_img from './img/chang.jpeg'

function ItemImg(props) {
    const [name , setFirstName] = useState(props.name);
    const [amount, setAmount] = useState(props.amount)

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
    if(name == "milo"){
        return(
        <div>
            <p><img src={milo_img} width={40} height={40}/> x{amount}</p>
        </div>
           );
    }
    if(name == "homey"){
        return(
        <div>
            <p><img src={homey_img} width={40} height={40}/> x{amount}</p>
        </div>
            );
    }
    if(name == "pepsi"){
        return(
        <div>
            <p><img src={pepsi_img} width={40} height={40}/> x{amount}</p>
        </div>
            );
    }
    if(name == "rosa"){
        return(
        <div>
            <p><img src={rosa_img} width={40} height={40}/> x{amount}</p>
        </div>
            );
    }
    if(name == "waiwai"){
        return(
        <div>
            <p><img src={waiwai_img} width={40} height={40}/> x{amount}</p>
        </div>
            );
    }
    if(name == "chang"){
        return(
        <div>
            <p><img src={chang_img} width={40} height={40}/> x{amount}</p>
        </div>
            );
    }
    return (
        <div>
            <p><img src={lay_img} width={40} height={40}/> x{amount}</p>
        </div>
      );
}

export default withRouter(ItemImg);
