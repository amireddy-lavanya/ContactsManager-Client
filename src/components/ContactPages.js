import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contactpage.css";
import ToolTip from "./ToolTip";
import { useContext, useState, useEffect } from "react";
import { Context } from "./axios/axioscontext";
import ImportButton from "./ImportButton";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';



function ContactPage() {
    
    const { contacts,setContacts, myFunction, query, setdeletearr  } = useContext(Context)
    const [itemOffset, setItemOffset] = useState(0);
    const[currentItems, setCurrentItems]=useState(contacts)
    const [pageCount, setPageCount]=useState(0);
    
    const navigate = useNavigate();
    const user = localStorage.getItem("email").split("@")[0].toUpperCase()

 const itemsPerPage=7;

  useEffect(() => {
   const endOffset = itemOffset + itemsPerPage;
   setCurrentItems(contacts.slice(itemOffset, endOffset))
   setPageCount(Math.ceil(contacts.length/itemsPerPage))

  },[itemOffset, itemsPerPage, contacts]);

  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % contacts.length;
   
    setItemOffset(newOffset);
}


    //checkbox function
    let dummyarr = []
    const checkedindi = (e) => {
        dummyarr.push(e.target.value)
        // console.log(dummyarr);
        setdeletearr((prev) => {
            return [...prev, ...dummyarr]
        })
    }
    function handleDeleteClick(_id) {
        const removeItem = contacts.filter((contact) => {
          return contact._id !== _id;
        });
        setContacts(removeItem);
      }
    
    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="dashboard col-lg-2 " style={{ height: "750px", backgroundColor: "#CEF3FF", display: "flex", flexDirection: "column" }}>
                    <div className="text-center pt-3 ">
                        <h1 className="text-primary pb-3">Logo</h1>
                        <p><i className="bi bi-grid"></i>  Dashboard</p>

                        <p className="btn btn-primary"><i className="bi bi-person-lines-fill"></i>  Total Contacts</p>
                    </div>

                    <div style={{ position: "absolute", bottom: "0", left: "3%" }}>
                        <h5 className="text-center" style={{ "cursor": "pointer" }} onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("email")
                            navigate("/");
                            window.alert("Logged Out Successfully");
                            document.location.reload();
                        }}><i className="bi bi-box-arrow-right" style={{ cursor: "pointer" , marginLeft:"37px"}}></i> Logout</h5>

                    </div>
                </div>
                <div className="crud shadow-lg col-lg-10 p-3  bg-body rounded">
                    <div className="row ">
                        <div className="col-sm-5  mt-2 mb-4 text-gred" style={{ color: "#454545" }}><h2><b>Total Contacts</b></h2></div>

                        <div className="col-sm-5 mt-2 mb-4 text-gred">

                            <div className="input-group">
                                <div className="form-outline">
                                    <input id="myInput" type="search" value={query} className="form-control" placeholder="Search by Email id.." onChange={myFunction} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2  mt-2 mb-4 text-gred d-flex" >
                            <div className="admin-image full-right" style={{ paddingLeft: "50px" }}>
                                <img src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600" alt="admin" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                            </div>
                            <div className="admin-content">
                                <p className="admin-name" style={{ marginLeft: "5px" }}><span>{user}</span><br />
                                    <span>Admin</span></p>
                            </div>
                        </div>
                    </div>
                    <ImportButton />
                    <div className="row">
                        <div className="table-responsive " >
                            <table className="table table-hover " id="myTable">
                                <thead>
                                    <tr style={{ backgroundColor: "#B2DFFF" }}>
                                        <th><input type="checkbox" id="checkAll" style={{ width: "15px", height: "15px", marginRight: "5px" }} /></th>
                                        
                                        <th>Name </th>
                                        <th>| Designation</th>
                                        <th>| Company </th>
                                        <th>| Industry </th>
                                        <th>| Email</th>
                                        <th>| Phone number</th>
                                        <th>| Country</th>
                                        <th>| Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {currentItems.map((udata, index) =>
                                        <tr key={udata._id}>
                                            <td><input type="checkbox" id="checksingle" value={udata._id} onClick={checkedindi} style={{ width: "15px", height: "15px", marginRight: "5px" }} /></td>
                                            <td> {udata.name}</td>
                                            <td> {udata.designation}</td>
                                            <td> {udata.company}</td>
                                            <td> {udata.industry}</td>
                                            <ToolTip content={udata.email}>
                                                <td> {udata.email}</td>
                                            </ToolTip>
                                            <td> {udata.phoneNumber}</td>
                                            <td> {udata.country}</td>
                                            <td> &nbsp;<i className="bi bi-pencil-fill"></i> &nbsp; &nbsp;<i className="bi bi-trash btn" onClick={()=>handleDeleteClick(udata._id)} ></i> </td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <div>
           
      <ReactPaginate

        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
            </div>
        </div>
    );
}

export default ContactPage;