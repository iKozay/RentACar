const fetchData = async (url, options) => {
   const result = { data: null, error: null, isLoading: true };
   
   try {
     const response = await fetch(url, options);
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     result.data = await response.json();
   } catch (error) {
     result.error = error;
   } finally {
     result.isLoading = false;
   }
   
   return result;
 };
 
 export default fetchData;