const getCurrentUser=()=>{

return JSON.parse(localStorage.getItem("currentUser"));
//This going to return local storage current user
};

export default getCurrentUser;