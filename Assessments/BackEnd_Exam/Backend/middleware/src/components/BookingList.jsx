import React from 'react';

const BookingList = ({ bookings }) => {
  return (
    <ul>
      {bookings.map((booking, index) => (
        <li key={index}>
          <p>Room: {booking.roomNumber}</p>
          <p>Check-In: {booking.checkInDate}</p>
          <p>Check-Out: {booking.checkOutDate}</p>
          <p>Booking Person: {booking.bookingPerson}</p>
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
