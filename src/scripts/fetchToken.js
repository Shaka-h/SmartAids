// Function to add metadata to IPFS
const fetchToken = async (tokenURI) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/ipfs/${tokenURI}`);
      const data = await response.json();
      return data
  
      // Handle data as needed
    } catch (error) {
      console.error('Error fetching data from', tokenURI, ':', error);
      // Handle error
    }
  
  };
   
  export default fetchToken;