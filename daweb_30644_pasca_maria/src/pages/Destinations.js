import { Link } from "react-router-dom";

export default function Destinations(){
    return(
        <div>
            <Link to="/home"><button class="btnBack" style={{marginTop:"5%"}}>Back</button></Link>
        </div>
    );
}