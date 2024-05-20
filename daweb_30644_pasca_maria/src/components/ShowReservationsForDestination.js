import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from '@mui/material/Table';


export default function ShowReservationsForDestination(){
    var id = useParams().id;

    var userId = sessionStorage.getItem("userId");

    const [reservations, setReservations] = useState();

    useEffect(() => {
        fetch(`http://localhost:8000/reservations/destination/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers:{"Content-Type":"application/json"}
        }).then(response => response.json())
            .then(data => { setReservations(data); })
            .catch((error) => console.error('Error fetching data:', error));
    }, [])

    const showReservations = reservations && reservations.map((reservation) => {
        return (    
        <tr key={reservation.id}>
            <td style={{whiteSpace: 'nowrap'}}>{reservation.id}</td>
            <td style={{whiteSpace: 'nowrap'}}>{reservation.idUser}</td>
            <td style={{whiteSpace: 'nowrap'}}>{reservation.numberOfPeople}</td>
            <td style={{whiteSpace: 'nowrap'}}>{reservation.totalPrice + "€"}</td>
            <td style={{whiteSpace: 'nowrap'}}>{reservation.reservationDate}</td>
            <td style={{whiteSpace: 'nowrap'}}>{JSON.stringify(reservation.cancelled)}</td>
        </tr>);
});



    return(
        <div>
            {userId && userId == 0 && reservations && 
             <div class="divMaxCard">
                <p class="lblMaxCard">Reservations</p>
                <hr style={{border:"1px solid black", width:"60%", marginLeft:"3%"}}></hr>
                <Table sx={{ maxWidth:"200px" }} aria-label="simple table" class="dashboard-table">
                    <thead>
                        <tr>
                            <th style={{paddingLeft:"10px", paddingRight:"10px", textAlign:"center"}}>Id</th>
                            <th style={{width:"auto"}}>User id</th>
                            <th style={{width:"auto"}}>Number of people</th>
                            <th style={{width:"auto"}}>Total price</th>
                            <th style={{width:"auto"}}>Reservation date</th>
                            <th style={{width:"auto"}}>Cancellation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showReservations}
                    </tbody>
                </Table>
            </div>}
            {(!userId || userId != 0) && <h1>You don't have access to see the reservation list!</h1>}
            <Link to={"/destination/"+id}><button class="btnNav" style={{marginLeft: "85%", position:"relative"}}>Back</button></Link>
        </div>
    );
}