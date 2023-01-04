
import { createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios"
export const Context = createContext();
export const  Provider = (props) => {
  const [contacts, setContacts] = useState([])
  const [deletearr,setdeletearr]=useState([]);
  const [email, setEmail] = useState("");
  const [token,setToken]=useState("")
  const [filterdata,setFilterData]=useState([])
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  const userSignIn = (loginData) => {
    axios
      .post("https://contactsmanager-server.onrender.com/login", loginData)
      .then((res) => {
        setToken(res.data.token)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", loginData.email);
        nav("/contacts");
        window.alert("Login Successful");
        //document.location.reload();
        setEmail(loginData.email);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        window.alert(err.response.data.message);
        console.log(err);
      });
  };

  const userSignUp = (userData) => {
    try {
      axios
        .post("https://contactsmanager-server.onrender.com/register", userData)
        .then((res) => {
          nav("/");
          window.alert("Registration Successful");
        })
        .catch((err) => window.alert(err.response.data.error));
    } catch (e) {
      window.alert(e.message);
    }
  };
 
  const config = {
    headers: {
      token:localStorage.getItem("token")
    },
  };
  //import contacts
  const postcontacts = async (contactdata) => {
    //console.log("Data-",contactdata)
    return await axios
      .post("https://contactsmanager-server.onrender.com/api/v1/contacts",contactdata,config)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data.message)
        // console.log(err)
      })
  }
  //getting contacts
  const fetchContacts = () => {
    axios
      .get("https://contactsmanager-server.onrender.com/api/v1/contacts",config)
      .then((res) => {
        //console.log(res.data.users);
      //   const data = res.data.message[0].Contacts;
      //  const data = res.data[0].contact;
      console.log(res.data.users);
      setContacts(res.data.users)
     
      //setContacts(contactperpage);
        setFilterData(res.data.users);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchContacts();

  },[]);
  
//Search Contacts---------------------------------
  const myFunction=(event)=> {
    event.preventDefault();

const getSearch=event.target.value;
console.log(getSearch)
if(getSearch.length != ""){
  const searchData=contacts.filter((item)=> item.email.toLowerCase().includes(getSearch))
    setContacts(searchData);
}
else{
  setContacts(filterdata) 
}
setQuery(getSearch);

  }


//delete contacts------------------------------------------------
  const deletecontacts=(id)=>{
    axios
      .delete(`https://contactsmanager-server.onrender.com/api/v1/contacts/${id}`,config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
  }
  const deleteRequestHandler =  (_id) => {
    const response =  axios.delete(
      `https://contactsmanager-server.onrender.com/api/v1/contacts/${_id}`,config);
   
    if (response.contacts) {
      setContacts(response.contacts);
    }
  };
  
  
    
  return (
    <Context.Provider value={{ postcontacts, deleteRequestHandler, setContacts,myFunction, contacts,deletecontacts,fetchContacts,setdeletearr,deletearr,userSignIn,
      email,userSignUp,token}}>
      {props.children}

    </Context.Provider>

  )

}