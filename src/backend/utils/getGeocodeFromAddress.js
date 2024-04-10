module.exports = async function getGeocodeFromAddress(address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${address}&limit=1&format=json`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch geocode data');
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error('No geocode data found for the address');
    }
    console.log(`location: ${data[0].lon}`);
    return data[0]; // Assuming you only want the first result
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    return null; // Return null or handle the error according to your needs
  }
};
