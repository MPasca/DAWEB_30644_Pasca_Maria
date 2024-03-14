
export default function Homepage(){
    return(
    <div>
        <div style={{display: "inline-flex"}}>
            <div style={{width:"80%", marginTop: "5%"}}>
                <h1 class="h1Title">Where next?</h1>
                <hr class="titleLine"/>
                <h2 class="h2Title">Find your next destination</h2>
                <input class="titleInput" placeholder="Search here" style={{marginBottom:"10%"}}/>
            </div>
            <img class="bgImage" src="seattle.jpg"/>
        </div>
    </div>
    );
}