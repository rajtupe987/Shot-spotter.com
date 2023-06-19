// import React, { useState, useEffect } from 'react';
// import './Bookings.css';

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     // Fetch the user's bookings from the server
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('https://your-api-url/bookings');
//         if (response.ok) {
//           const data = await response.json();
//           setBookings(data);
//         } else {
//           // Handle error case
//           console.error('Failed to fetch bookings:', response.status);
//         }
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       const response = await fetch(`https://your-api-url/bookings/${bookingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: 'Cancelled' })
//       });

//       if (response.ok) {
//         // Booking cancellation successful
//         // Refresh the bookings list by fetching data again
//         fetchBookings();
//       } else {
//         // Handle cancellation error case
//         console.error('Failed to cancel booking:', response.status);
//       }
//     } catch (error) {
//       console.error('Error cancelling booking:', error);
//     }
//   };

//   return (
//     <div className="bookings-container">
//       <h1>My Bookings</h1>
//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         bookings.map((booking) => (
//           <div
//             key={booking._id}
//             className={`booking-card ${booking.status === 'Cancelled' ? 'cancelled' : 'confirmed'}`}
//           >
//             <p>Your Contact: {booking.customerContact}</p>
//             <p>Photographer: {booking.photographer}</p>
//             <p>Start Date: {booking.startTime}</p>
//             <p>End Date: {booking.endTime}</p>
//             <br />
//             <span>Booking Status: {booking.status}</span>
//             {booking.status === 'Confirmed' && (
//               <button onClick={() => handleCancelBooking(booking._id)}>Cancel</button>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Bookings;
