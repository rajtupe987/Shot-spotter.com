import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bookings.css';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const Bookings = ({ baseURL }) => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const [cancel,setCancel] = useState(false);

    useEffect(() => {
        // Set the document title
        document.title = 'My Bookings';
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${baseURL}/bookings/client`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setBookings(data.bookings);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [cancel]);

    const handleCancelBooking = async (bookingId) => {
        const token = localStorage.getItem('token');
        fetch(`${baseURL}/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ status: 'Cancelled' })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then((data) => {
                console.log("Booking cancelled");
                setCancel(!cancel);
                navigate('/bookings');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Navbar />
            <h1>My Bookings</h1>
            <div className="bookings-container">
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className={`booking-card ${booking.status === 'Cancelled' ? 'cancelled' : booking.status === 'Pending' ? 'pending' : 'confirmed'}`}
                        >
                            <div className='studio'>
                                <img src={booking.photographer.image} alt="" />
                                <div>
                                    <p>{booking.photographer.name}</p>
                                    <p>{booking.photographer.profile}</p>
                                    <p>From {booking.startTime.split("T")[0]} to {booking.endTime.split("T")[0]}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='user-details'>
                                <div>
                                    <p>Your Contact: <b>{booking.customerContact}</b></p>
                                    <p>Booking Status: <span className='status'>{booking.status}</span></p>
                                </div>
                                {booking.status === 'Confirmed' && (
                                    <button onClick={() => handleCancelBooking(booking._id)}>Cancel Booking</button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </>
    );
};

export default Bookings;
