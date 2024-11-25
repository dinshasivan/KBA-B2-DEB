import React, { useEffect, useState } from 'react';

const ViewBookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch bookings from the backend
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3001/getBooking',{
                  method:"GET",
                  headers:{
                    'Contet-Type':'applicaction/json'
                  },
                });
                // console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    
                    setBookings(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Failed to fetch bookings');
                }
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('An error occurred while fetching bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div className="text-center text-gray-700 mt-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

    return (
        <div className="bg-gray-100 w-4/5 mx-auto mt-10 p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Booking Details</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Room Number</th>
                        <th className="border border-gray-300 px-4 py-2">Check-In Date</th>
                        <th className="border border-gray-300 px-4 py-2">Check-Out Date</th>
                        <th className="border border-gray-300 px-4 py-2">Booking Person</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{booking.roomNo}</td>
                                <td className="border border-gray-300 px-4 py-2">{booking.checkinDate}</td>
                                <td className="border border-gray-300 px-4 py-2">{booking.checkoutDate}</td>
                                <td className="border border-gray-300 px-4 py-2">{booking.personName}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No bookings found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewBookingPage;
