export default function getBranch(){
    return JSON.parse(localStorage.getItem("branch"));
}