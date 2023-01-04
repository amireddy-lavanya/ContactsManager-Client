import { useContext, useState } from "react";
import { parse } from "papaparse";
import { Context } from "./axios/axioscontext";
import tick from "../images/tick.png";
import file from "../images/file.png";
import "./import.css";
import deleteCom from "../images/deleteCom.png";


const ImportButton = () => {
    const { postcontacts, deletearr, deletecontacts, fetchContacts } = useContext(Context)
    const [button, setbutton] = useState(false)
    const [deleteButton, setDeleteButton] = useState(false);
    const [popdel, setpopdel] = useState(true)
    const [popimport, setPopimport] = useState(true)
    // console.log(deletearr)
    const handledrag = (e) => {
        e.preventDefault()
    }
    const handledrop = (e) => {
        e.preventDefault()

        const convertarr = Array.from(e.dataTransfer.files) //converting object to array
        convertarr.map(async file => { //
            //console.log(file) //convertion to object
            let text = await file.text() //convertion to object to csv text
            let result = parse(text, { header: true }) //converting csvtext to json object // header is for field headings
            //document.location.reload()
            console.log(result.data)
            postcontacts(result.data)
            // document.location.reload()

        })
        setPopimport(false)
    }
    let set = new Set()
    const handledelete = (e) => {
        for (let i = 0; i < deletearr.length; i++) {
            if (!set.has(deletearr[i])) set.add(deletearr[i])
            else set.delete(deletearr[i])
        }
        for (let id of set.keys()) {
            deletecontacts(id)
        }
        fetchContacts()
        setpopdel(false)


    }
    const deletefinal = () => {
        setDeleteButton(false);
        //document.location.reload()

    }

    return (
        <>

            <div className="main">
                <div className="row">
                    <div className="controls pb-3" style={{ display: "flex", width: "100%", justifyContent: "space-between", margin: "0px" }}>
                        <div className="left" style={{ display: "flex", width: "25%", justifyContent: "space-between" }}>

                            <button type="button" className="btn btn-default shadow-lg bg-body rounded" ><i className="bi bi-calendar-check"></i> Select Date</button>


                            <button type="button" className="btn btn-default shadow-lg bg-body rounded"><i className="bi bi-filter"></i> Filters</button>

                        </div>

                        <div className="right" style={{ display: "flex", width: "30%", justifyContent: "space-between" }}>
                            <span> <button type="button" onClick={() => { setDeleteButton(true) }} className="btn btn-default shadow-lg bg-body rounded"><i className="bi bi-trash"></i> Delete</button></span>
                            <span> <button type="button" onClick={() => { setbutton(true) }} className="btn btn-default shadow-lg bg-body rounded"><i className="bi bi-arrow-down-up"></i> Import</button></span>


                            <button type="button" className="btn btn-default shadow-lg bg-body rounded"><i className="bi bi-upload"></i> Export</button>

                        </div>
                    </div>
                </div>
                
                {button &&
                    <>
                        {(popimport) ? (
                            <div id="page" onDragOver={handledrag} onDrop={handledrop}>
                                <div id="card">
                                    <div id="importimg">
                                        <img src={file} alt="PopUp" className="popup-img"/>
                                    </div>
                                    <div id="import">Import File</div>
                                    <div id="drop">Drag and  Drop a CSV File to Upload</div>
                                    <button id="butmainimp">
                                        <div id="cancel" onClick={() => { setbutton(false) }}>Cancel</div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div id="page" >
                                <div id="card">
                                    <div id="importcompleteimg"><img src={tick} alt="PopUp" /></div>
                                    <div id="importcom">Import completed</div>
                                    <div id="dropcom">CSV File is Uploaded</div>
                                    <button id="butmainimp">
                                        <div id="cancel" onClick={() => { setbutton(false)}}>Ok</div>
                                    </button>
                                </div>
                            </div>)}
                    </>
                }
                { /* delete functionality */}
                {deleteButton &&
                    <>
                        {(popdel) ? (
                            <div id="page" >
                                <div id="card">
                                    <div id="importimg">
                                        <img src={deleteCom} alt="PopUp" className="del-img"/>
                                    </div>
                                    <div id="del">Delete Contacts</div>
                                    <div id="dropdel">Sure you want to delete this Contacts?</div>
                                    <button id="butmain">
                                        <div id="cancel" onClick={() => { setDeleteButton(false) }}>Cancel</div>
                                    </button>
                                    <button id="ok" onClick={handledelete}>Ok</button>

                                </div>
                            </div>
                        ) : (
                            <div id="page" >
                                <div id="card">
                                    <div id="deliconimg">
                                        <img src={tick} alt="PopUp" />
                                    </div>
                                    <div id="delcon">Deleted Contacts</div>
                                    <button id="delbutt">
                                        <div id="delok" onClick={deletefinal}>OK</div>
                                    </button>
                                </div>
                            </div>
                        )

                        }
                    </>
                }

            </div>
            {/* <div className='right-nav'>
                <div className='nav-items'>
                    {/* <img src={Export} alt="" /> */}
            {/* <span>Export</span> */}
            {/* </div> */}
            {/* </div> */}
        </>

    )

}
export default ImportButton;