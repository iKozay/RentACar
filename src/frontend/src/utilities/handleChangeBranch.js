export default function handleChangeBranch(branchName,id){
    localStorage.setItem('branch',JSON.stringify( {name:branchName,id:id}));
  
  }