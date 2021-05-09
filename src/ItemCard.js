import React , { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import img from './img/lay.jpeg'
import ItemImg from './ItemImg';

function ItemCard(props) {
    const [name , setFirstName] = useState(props.item.name);
    const [amount, setLastName] = useState(props.item.amount);
    const [price, setPrice] = useState(props.item.price);
    const map_eng_th= require('./map_eng_th.json')

    const src_img = "./img/".concat(name,".jpeg")
    
    return (

        <Card style={{ marginBottom: '10px', height: '60px', width: '300px', backgroundColor: '#FFFFFF', opacity: '80%', borderRadius: '15px', justifyContent: 'center',alignItems: 'center'}}>
            <Grid container spacing={1} >
                <Grid container item xs={12} spacing={3} direction="row">
                    <Grid item xs>
                        <ItemImg name={name} amount={amount}/>
                        <p>x {amount}</p>
                    </Grid>
                    <Grid item xs>
                        <p >{map_eng_th[name]}</p>
                    </Grid>
                    <Grid item xs>
                        <p>{price * amount}บาท</p>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Card>
      );
}

export default withRouter(ItemCard);
