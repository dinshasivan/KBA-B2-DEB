import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterDate, setFilterDate] = useState('');

    const navigate = useNavigate();

    const fetchBookings = async (date) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://127.0.0.1:3001/getBooking/${date}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                
                setBookings(data);
            } else {
                setError('Failed to fetch bookings.');
            }
        } catch (err) {
            setError('An error occurred while fetching bookings.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFilterDate(selectedDate);

        if (selectedDate) {
            fetchBookings(selectedDate);
        } else {
            setBookings([]); // Clear bookings if no date is selected
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">View Bookings</h1>
            <div className="mb-4">
                <label htmlFor="filterDate" className="block mb-2 font-medium">
                    Filter by Date:
                </label>
                <input
                    type="date"
                    id="filterDate"
                    value={filterDate}
                    onChange={handleDateChange}
                    className="border p-2 rounded-md"
                />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && bookings.length > 0 ? (
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Room Number</th>
                            <th className="border border-gray-300 px-4 py-2">Check-In Date</th>
                            <th className="border border-gray-300 px-4 py-2">Check-Out Date</th>
                            <th className="border border-gray-300 px-4 py-2">Booking Person</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {booking.roomNo}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {booking.checkinDate}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {booking.checkoutDate}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {booking.personName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p>No bookings found for the selected date.</p>
            )}
        </div>
    );
};

export default DisplayBooking;
