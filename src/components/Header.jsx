import React, {useEffect, useState} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Table from 'react-bootstrap/Table';

import {useSelector, useDispatch} from 'react-redux'

import { DLT } from '../Redux/actions/actions';

import { NavLink } from 'react-router-dom';

const Header = () => {

    const [price, setPrice] = useState(0)

    const dispatch = useDispatch();

    const getData = useSelector((state) => state.cartreducer.carts);
    // console.log(getData);

    const dlt = (id) => {
      dispatch(DLT(id));
    }

    const total = () => {
      let price = 0;
      getData.map((elm, k) => {
        // price = elm.price + price
        price = elm.price * elm.qnty + price
      });
      setPrice(price);
    };
    
    useEffect(() => {
      total();
    }, [total])

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <div>
        <Navbar bg="dark" variant="dark" style={{height: '60px'}}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">Add to cart</NavLink>
          <Nav className="me-auto">
            <NavLink to='/home' className="text-decoration-none text-light">Home</NavLink>
          </Nav>
          <Badge 
            color='primary' 
            badgeContent={getData.length}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <i className="fa-sharp fa-solid fa-cart-shopping text-light" style={{fontSize: "25px"}}></i>
          </Badge>
        </Container>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
          {
            getData.length ? 
              <div className='card_details' style={{width:"24rem", padding:"10"}}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Restaurant Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        getData.map((e) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                    <img src={e.imgdata} alt="" style={{width:"5rem",height:"5rem"}}/>
                                  </NavLink>
                                </td>
                                <td>
                                  <p>{e.rname}</p>
                                  <p>Price: ₹{e.price}</p>
                                  <p>Quantity: ₹{e.qnty}</p>
                                  <p style={{color:"red",fontSize:20,cursor:"pointer" }} onClick={() => dlt(e.id)}>
                                    <i className='fas fa-trash smalltrash'></i>
                                  </p>
                                </td>
                                <td className='mt-5'style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={() => dlt(e.id)}>
                                    <i className='fas fa-trash largetrash'></i>
                                </td>
                              </tr>
                            </>
                          )
                        })
                      }
                      <p className='text-center'>Total : ₹{price}</p>
                    </tbody>
                  </Table>
              </div> 
              : 
              <div className="card_details d-flex justify-content-center align-items-center" style={{width: "24rem", padding: 10, position: "relative"}}>
                  <i className='fas fa-close smallclose' style={{position:"absolute", top:2, right:20,fontSize:23,cursor:"pointer"}} onClick={handleClose}></i>
                  <p style={{fontSize:"22px"}}>Your Card Is Empty</p>
              </div>
        } 
      </Menu>
      </Navbar>
    </div>
  )
}

export default Header