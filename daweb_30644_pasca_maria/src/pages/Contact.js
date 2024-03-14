
export default function Contact(){
    return(
        <div style={{display: "inline-flex"}}>
            <div style={{paddingLeft: "5%", marginTop:"1%", width:"80%"}}>
                <h1 class="h1Contact">Contact</h1>
                <hr style={{marginLeft: "-5%", width: "80%"}}/>
                <div style={{paddingBottom:"1%"}}>
                    <h2 class="h2Contact" style={{display: "inline"}}>Telephone:</h2>
                    <h2 class="h2Contact" style={{fontSize: "40px", display: "inline", fontWeight:"400"}}>+40733282283</h2>
                </div>
                <div style={{paddingBottom:"1%"}}>
                    <h2 class="h2Contact" style={{display: "inline"}}>Email:</h2>
                    <h2 class="h2Contact" style={{fontSize: "40px", display: "inline", fontWeight:"400"}}>contact@wherenext.ro</h2>
                </div>
                <div>
                    <h2 class="h2Contact" style={{display: "inline"}}>Address:</h2>
                    <h2 class="h2Contact" style={{fontSize: "40px", display: "inline", fontWeight:"400"}}>Cluj-Napoca</h2>
                    <h2 class="h2Contact" style={{fontSize: "40px",fontWeight:"400", marginLeft:"5%"}}>str. XYZ, nr. 42, jud. Cluj, Romania</h2>
                </div>
                <button class="btnBack" style={{marginTop:"5%"}}>Back</button>
            </div>
            <img class="bgImage" src="seattle.jpg"/>
        </div>
    );
}