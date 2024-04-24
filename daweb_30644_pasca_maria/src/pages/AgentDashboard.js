import { useParams } from "react-router";
import Dashboard from "../components/Dashboard";
import { Link } from "react-router-dom";

export default function AgentDashboard () {
    var id = sessionStorage.getItem("userId");
        // add logic for checking in persistence if the user exists and has privileges, get name
        console.log(id);

    var checkPrivilege = false;
    if(id == 0)
    {
        checkPrivilege = true;
    }

    const handleLogoutbtn = () => {
        sessionStorage.clear();
    }

    return(
        <div>
            {checkPrivilege && <div>
                <Link to="/login"><button className="btnNav" style={{ marginLeft:"80%", height:"100px" }} onClick={handleLogoutbtn}>Logout</button></Link>
                <h1 class="h1Title">Hello - Admin Dashboard</h1>
                <hr class="titleLine" style={{width:"60%", marginBottom: "1%"}}/>
                <Dashboard/>
            </div>}
            {!checkPrivilege &&
            <div>
                <h1 class="h1Title">The user does not have admin privileges!</h1>
                <Link to="/login"><button className="btnNav" style={{ marginLeft:"80%", height:"100px" }}>Go back</button></Link>
            </div> }
        </div>
    );
}