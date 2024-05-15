// Function to add metadata to IPFS
async function fetchData(tokenUrl) {
  const responseData = []; // Array to store response data

  try {
      const response = await fetch(`http://127.0.0.1:8080/ipfs/${tokenUrl}`);
      const data = await response.json();
      responseData.push(data); // Push data to responseData array
      console.log('Data for', tokenUrl, ':', data);
      // Handle data as needed
  } catch (error) {
      console.error('Error fetching data from', tokenUrl, ':', error);
      // Handle error
  }
  return responseData; // Return the array of response data
}

export default fetchData;