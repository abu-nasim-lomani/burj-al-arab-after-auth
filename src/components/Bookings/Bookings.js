import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings]= useState([]);
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:3002/bookings?email='+loggedInUser.email,{
            method: 'get',
            headers: {
                'Content-Type':'application/json',
                authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
        })
        .then(res=>res.json())
        .then(data=>setBookings(data))
    },[])
    return (
        <div>
            <h3>You Have {bookings.length} Bookings</h3>
            {
                bookings.map(booking=><li>{booking.name} { "  "} {booking.email}  {(new Date(booking.checkIn)).toString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;