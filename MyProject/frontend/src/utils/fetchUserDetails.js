const fetchUserDetails = async () => {
    try {
        const response = await fetch('/api/user/details', {
            method: 'GET', // Use the appropriate HTTP method
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Handle non-200 responses
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json(); // Parse the JSON response
        return data; // Return the parsed data
    } catch (error) {
        console.error('Failed to fetch user details:', error);
        return null; // Return null or handle the error appropriately
    }
};

export default fetchUserDetails;
