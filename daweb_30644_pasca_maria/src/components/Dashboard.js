import { Link } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useEffect, useState } from "react";


export default function Dashboard () {

    const [existingDestinations, setExistingDestinations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/destinations', {
            method: 'GET',
            mode: 'cors',
            headers:{"Content-Type":"application/json"}
        }).then(response => response.json())
        .then(data => { setExistingDestinations(data); })
        .catch((error) => console.error('Error fetching data:', error));

    }, [])

    const [updateId, setDestinationToUpdate] = useState();
    const [deleteId, setDestinationToDelete] = useState();

    const handleEdit = () => {
        console.log("in handle edit for destination id: " + updateId);
        sessionStorage.setItem("destinationId", updateId || existingDestinations[0].id);
        window.location.href = "http://localhost:3000/update_destination";
    }

    const handleDelete = () => {
        if(deleteId) {
            fetch(`http://localhost:8000/destinations/delete/${deleteId}`, {
                method: 'DELETE',
                mode: 'cors',
                headers:{"Content-Type":"application/json"}
            }).then(response => response.json())
                .then(data => { console.log("deleted element with id: " + deleteId) })
                .catch((error) => console.error('Error deleting destination:', error));

        }
        else {
            fetch(`http://localhost:8000/destinations/delete/${existingDestinations[0].id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers:{"Content-Type":"application/json"}
            }).then(response => response.json())
                .then(data => { console.log("deleted element with id: " + deleteId) })
                .catch((error) => console.error('Error deleting destination:', error));

        }
        setDestinationToDelete();
    }

    const showDestinations = existingDestinations.map((destination) => {
            return (    
            <tr key={destination.id}>
                <td style={{whiteSpace: 'nowrap'}}>{destination.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{destination.location}</td>
                <td style={{whiteSpace: 'nowrap'}}>{destination.price}</td>
                <td style={{whiteSpace: 'nowrap'}}>{destination.numberOfSeats}</td>
                <td style={{whiteSpace: 'nowrap'}}>{JSON.stringify(destination.isChildFriendly)}</td>
                <td style={{whiteSpace: 'nowrap'}}>{destination.offer}%</td>
            </tr>);
    });

    return(
        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <Paper sx={{width: 'auto', maxWidth:"72%", maxHeight:"60%", display:"inline-flex", marginTop:"-200px", marginRight:"30px", marginLeft:"-30px", backgroundColor:"#D9D9D9"}}>
                <Table sx={{ maxWidth:"200px" }} aria-label="simple table" class="dashboard-table">
                    <thead>
                        <tr>
                            <th style={{paddingLeft:"10px", paddingRight:"10px", textAlign:"center"}}>Id</th>
                            <th style={{width:"300px"}}>Location</th>
                            <th style={{width:"auto"}}>Price</th>
                            <th style={{width:"auto"}}>Seats</th>
                            <th style={{width:"auto"}}>Child friendly?</th>
                            <th style={{width:"auto"}}>Offer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showDestinations}
                    </tbody>
                </Table>
            </Paper>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div style={{display:"flex", flexDirection:"row", border:"1px solid black", borderRadius:"10px", backgroundColor:"#D9D9D9", padding:"20px", alignItems:"center", marginBottom:"20px"}}>
                    <h2 style={{marginRight:"10px"}}>Add destination</h2>
                    <Link to="/add_destination"><button style={{fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize:"24px"}}>Add</button></Link>
                </div>
                <div style={{display:"flex", flexDirection:"row", border:"1px solid black", borderRadius:"10px", backgroundColor:"#D9D9D9", padding:"20px", alignItems:"center", marginBottom:"20px"}}>
                    <h2 style={{marginRight:"10px"}}>Edit destination:</h2>
                    <select class="btnDashboardOption"
                            value={updateId}
                            onChange={e => setDestinationToUpdate(e.target.value)}
                            >{existingDestinations.map((mock) => <option value={mock.id}>{mock.id}</option>)}
                    </select>
                    <button style={{fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize:"24px"}} onClick={handleEdit}>Update</button>
                </div>
                <div style={{display:"flex", flexDirection:"row", border:"1px solid black", borderRadius:"10px", backgroundColor:"#D9D9D9", padding:"20px", alignItems:"center"}}>
                    <h2 style={{marginRight:"10px"}}>Del. destination:</h2>
                    <select class="btnDashboardOption"
                            value={deleteId}
                            onChange={e => setDestinationToDelete(e.target.value)}
                            >{existingDestinations.map((mock) => <option value={mock.id}>{mock.id}</option>)}
                    </select>
                    <button style={{fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize:"24px"}} onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}