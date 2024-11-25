import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navebar from '../components/Navebar';

const AddBookingPage = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [bookingPerson, setBookingPerson] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBooking = {
            roomNumber,
            checkInDate,
            checkOutDate,
            bookingPerson,
        };
        try {
            const res = await fetch('http://127.0.0.1:3001/hotelBooking', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBooking),
            });
            console.log(newBooking);
            
            if (res.ok) {
                navigate('/view-booking');
            } else {
                const errorData = await res.json();
                alert(errorData.message || 'Failed to add booking');
                console.error('Error:', errorData);
            }
        } catch (err) {
            console.error('Error connecting to backend:', err);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
        
        <div className="bg-gray-200 w-2/5 mx-auto mt-10 p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Booking</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <label htmlFor="roomNumber" className="font-bold">Room Number:</label>
                <input
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    placeholder="Room Number"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    className="w-full border border-gray-300 h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label htmlFor="checkInDate" className="font-bold">Check-In Date:</label>
                <input
                    type="date"
                    id="checkInDate"
                    name="checkInDate"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                    className="w-full border border-gray-300 h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label htmlFor="checkOutDate" className="font-bold">Check-Out Date:</label>
                <input
                    type="date"
                    id="checkOutDate"
                    name="checkOutDate"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                    className="w-full border border-gray-300 h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label htmlFor="bookingPerson" className="font-bold">Booking Person:</label>
                <input
                    type="text"
                    id="bookingPerson"
                    name="bookingPerson"
                    placeholder="Booking Person"
                    value={bookingPerson}
                    onChange={(e) => setBookingPerson(e.target.value)}
                    required
                    className="w-full border border-gray-300 h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="w-full h-12 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add Booking
                </button>
            </form>
        </div>
        </>
    );
};

export default AddBookingPage;
