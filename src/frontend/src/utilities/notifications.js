import fetchData from "./fetchData";
export default async function notifications (id){
    const response = await fetchData("http://localhost:3000/api/issues", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let counter = 0;
      if(response.data){
        response.data.map(issue=>{
            if(issue.replies[issue.replies.length-1].sender._id!=id && !issue.replies[issue.replies.length-1].seen)counter++;
        }
        )
       
        const result = counter>0?true:false;
        console.log(result);
        return result;
        }
      else {return false;}
}