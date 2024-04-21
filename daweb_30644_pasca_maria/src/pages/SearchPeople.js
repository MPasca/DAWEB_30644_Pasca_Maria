import { useState } from "react";
import { Link } from "react-router-dom";
import ValidatePeople from "../validators/ValidatePeople";

export default function SearchPeople(){
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    var id = JSON.parse(localStorage.getItem("id"));

    const handleChangeAdults = (noAdults) => {
        if(noAdults > 0){
            setAdults(noAdults);
        }
        else{
            setAdults(0);
        }
    };

    const handleChangeChildren = (noChildren) => {
        if(noChildren > 0){
            setChildren(noChildren);
        }
        else{
            setChildren(0);
        }
    }

    const handleClick = () => {
        if(ValidatePeople(adults, children)){
            sessionStorage.setItem("adults", JSON.stringify(adults));
            sessionStorage.setItem("children", JSON.stringify(children));    
        }
        else{
            throw Error("Inadequate number of goers:");
        }
        sessionStorage.setItem("adults", JSON.stringify(adults));
        sessionStorage.setItem("children", JSON.stringify(children));    
    } 

    return(
    <div style={{display: "inline-flex"}}>
        <div style={{display:"block", width:"80%", marginTop:"-3%"}}>
            <h1 class="h1Title" style={{marginBottom:"-3%"}}>Where next?</h1>
            <hr class="titleLine"/>
            <div style={{width:"80%", marginTop: "5%"}}>
                <h2 class="h2Title" style={{marginBottom:"1%"}}>How many adults are going?</h2>
                <input class="btnTitle" placeholder="Type here" style={{marginBottom:"5%", paddingRight:"0px", width:"70px", height:"30px"}}
                    id="txtAdults" value={adults} onChange={(e) => handleChangeAdults(e.target.value)} type="number"/>

                {(id === null || (id !== null && JSON.parse(localStorage.getItem("mocks"))[id-1].childFriendly)) &&
                <div>
                    <h2 class="h2Title" style={{marginBottom:"1%"}}>How many children are going?</h2>
                    <input class="btnTitle" placeholder="Type here" style={{marginBottom:"10%", paddingRight:"0px", width:"70px", height:"30px"}}
                        id="txtChildren" value={children} onChange={(e) => handleChangeChildren(e.target.value)} type="number"/>
                </div>}
                {id !== null &&
                    <Link to={`/destination/${id}`}><button class="btnNav" style={{ display:"block", marginLeft:"75%", marginTop:"-5%"}} onClick={handleClick}>Next</button></Link>
                }
                {id == null &&
                    <Link to="/destinations"><button class="btnNav" style={{ display:"block", marginLeft:"75%", marginTop:"-5%"}} onClick={handleClick}>Next</button></Link>
                }
                <Link to="/search_date"><button class="btnNav" style={{ display:"block", marginLeft:"0%", marginTop:"-5%"}}>Back</button></Link>
            </div>
        </div>
        <img class="bgImage" src="seattle.jpg" style={{display:"inline-flex"}}/>
    </div>

    );
}