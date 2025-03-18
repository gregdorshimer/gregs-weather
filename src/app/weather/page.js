import Link from "next/link"

export default function WeatherPage({children}) {
    return (
        <div className="container text-center">
            
            <div className="row">
                {/* TODO title area */}
                <h1>Greg's Weather</h1>
                <Link href="/"><button type="button" className="btn btn-primary">Home</button></Link>
            </div>
            
            


            <div className="row">

                <div className="col-4">
                    {/* TODO left column for location description, legend */}
                    <p>Sample location description.</p>
                </div>

                <div className="col-4">
                    {/* TODO forecast graph content */}
                    <p>Sample forecast graph.</p>
                </div>

                <div className="col-4">
                    {/* TODO search bar and recent locations */}
                    <p>Sample search bar and recently viewed.</p>
                </div>

            </div>



            <div>
                {/* TODO component for fetching forecast */}
                <button type="button" className="btn btn-primary">Fetch Forecast</button>
            </div>        




            <div className="container text-center fixed-bottom">
                <p>Developed by Greg Dorshimer • March 2025</p>
                {/* TODO footer here e.g. "Built by Greg Dorshimer 2025" */}
            </div>

        </div>
    );
}
