import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link"
import Forecast from "./forecast";

export default function WeatherPage({children}) {

    return (
        <div className="container text-center">
                        
            <div className="row">
                {/* TODO title area. navbar? see bootstrap components */}
                <h1>Weather</h1>
                <Link href="/"><button type="button" className="btn btn-primary">Home</button></Link>
            </div>
                
            <Forecast />
        
            <div className="container text-center fixed-bottom">
                <p>Developed by Greg Dorshimer • March 2025</p>
                {/* TODO footer style */}
            </div>
    
        </div>
    );
}
