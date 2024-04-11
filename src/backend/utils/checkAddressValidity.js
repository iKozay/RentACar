async function checkAddressValidity(address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${address}&limit=1&format=json`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch geocode data');
    }
    const data = await response.json();
    if (data.length === 0) {
      return false; // No geocode data found for the address
    }

    return true; // Geocode data found for the address
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    return false; // Return false in case of any error
  }
}

module.exports = checkAddressValidity;
