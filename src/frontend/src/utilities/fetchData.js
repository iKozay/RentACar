const fetchData = async (url, options) => {
   const result = { data: null, error: null, isLoading: true };
   
   try {
     const response = await fetch(url, options);
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      result.data = await response.json();
    } else {
      result.data = await response.text(); // If not JSON, store as text
    }
   } catch (error) {
     result.error = error;
   } finally {
     result.isLoading = false;
   }
   
   return result;
 };
 
 export default fetchData;