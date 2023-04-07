import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux'

import { ADD, DLT, REMOVE } from '../Redux/actions/actions';

const CardsDetails = () => {

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const {id} = useParams();
  console.log(id); // we are getting this id from url


  const getData = useSelector((state) => state.cartreducer.carts);
  console.log(getData);

  const dlt = (id) => {
    dispatch(DLT(id));
    navigate("/")
  }

  const removeIndivisual = (item) => {
    dispatch(REMOVE(item))
  }

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id
    });
    // console.log(compareData);
    setData(compareData);
  }

  useEffect(()=>{
    compare();
  },[id])

  // plus sign par click karne par me iss function ko call kar rha hu
  // issi function ko mene cart.jsx file me bhi call kiya hai Add to cart button ke click par
  const send = (e) => {
    dispatch(ADD(e));
  }

  return (
    <div className='container mt-2'>
      <h2 className='text-center'>Items Details Page</h2>
      <section className='container mt-3'>
        <div className='iteamsdetails'>
            {
              data.map((elm) => {
                return (
                  <>
                    <div className='items_img'>
                      <img src={elm.imgdata} alt="img" />
                    </div>
                    <div className='details'>
                      <Table>
                        <tr>
                            <td>
                              <p><strong>Restaurant</strong> : {elm.rname}</p>
                              <p><strong>Price</strong> : ₹ {elm.price}</p>
                              <p><strong>Deshes</strong> : {elm.address}</p>
                              <p><strong>Total</strong> : ₹ {elm.price * elm.qnty}</p>

                              {/* INC and DEC option */}
                              <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                                <span style={{fontSize:24}} onClick={elm.qnty <=1 ? () => dlt(elm.id) : () => removeIndivisual(elm)}>-</span>
                                <span style={{fontSize:22}}>{elm.qnty}</span>
                                <span style={{fontSize:24}} onClick={() => send(elm)}>+</span>
                              </div>
                            </td>
                            <td>
                              <p><strong>Rating</strong> : <span style={{background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px"}}>{elm.rating} ★ </span></p>
                              <p><strong>Order Review</strong> : <span>{elm.somedata}</span></p>
                              <p onClick={() => dlt(elm.id)}><strong>Remove :</strong> <i className='fas fa-trash' style={{color: "red", cursor: "pointer"}}></i> </p>
                            </td>
                        </tr>
                      </Table>
                  </div>
                </>
                )
              })
            }
        </div>
      </section>
    </div>
  )
}

export default CardsDetails