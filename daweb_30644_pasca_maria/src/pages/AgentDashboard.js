import { useParams } from "react-router";
import Dashboard from "../components/Dashboard";

export default function AgentDashboard () {
    var id = useParams().id;
        // add logic for checking in persistence if the user exists and has privileges, get name
        console.log(id);
    const name = "Jane Doe";
    var checkPrivilege = false;
    if(id == 1)
    {
        checkPrivilege = true;
    }

    return(
        <div>
            <h1 class="h1Title">Hello, {name}</h1>
            <hr class="titleLine" style={{width:"60%", marginBottom: "5%"}}/>

            {checkPrivilege &&
            <Dashboard/>}
            {!checkPrivilege &&
            <div>
            </div> }
        </div>
    );
}