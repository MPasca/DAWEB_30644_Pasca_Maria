import { Link } from "react-router-dom";

export default function Destinations(){
    return(
        <div style={{overflow:"auto"}}>
            <Link to="/home"><button class="btnNav" style={{marginTop:"5%", marginLeft: "0%"}}>Back</button></Link>
        </div>
    );
}