import React, { useState,useEffect } from 'react';
import axios from '../node_modules/axios';
import Modal from 'react-modal';
// import './PatientModal.css';
// import Button from '@material-ui/core/Button';


const CashierModal = (props) => {

    const [modalIsOpen, setmodalIsOpen] = useState('');
    const [editAble, seteditAble] = useState(false);
    var cart = props.cart

    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0%',
        transform: 'translate(-50%, -50%)',
        justifyContent: 'center',
        borderRadius:'28px'
    }

  };

    

  
//   useEffect(() => {
//     axios.get('http://localhost:8080/'+props.location.state._id+'/getpatients',
//     {
//       headers: { Authorization: `Token ${localStorage.getItem('token')}` }
//     })
//     .then(res=>{
//         if(res.status === 200){
//             var patientlist = []
//             for(var x in res.data){
//               if(res.data[x]._id == _id){
//                 setPatient(res.data[x]);
//                 setUsername(res.data[x].username);
//               }
//             }
//         }
//     })
// },[])
    function renderList(cart){
        console.log(cart)
        if(cart.length != 0){
        return(
            cart.map((item) => {
            let name = item.name
            let amount = item.amount
            return(
                <div>
                {name}x{amount}
                </div>
            )
            })
        )
        }
    }


  const openModal = async () => {
    await setmodalIsOpen(true);
  }


  const closeModal = async () => {
    seteditAble(false);
    await setmodalIsOpen(false);
  }


    return (
      
      <div className = 'moreContainer' style={{position:"absolute", bottom:0, marginBottom:"100px"}}>
        {/* <button className="moreBtn" onClick={openModal}>More</button> */}
        <div className="LogButton" onClick={openModal} >
            <p>ชำระเงิน</p>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={()=>closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div style={{width:'250px', height:'600px'}}>
            <div>
                {renderList(cart)}
            </div>
        </div>
        </Modal>
      </div>
    )

  


}
export default CashierModal;