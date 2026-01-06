import "bootstrap/dist/css/bootstrap.min.css";
// import ApiKey from "./api-key";

export default function WeatherLayout({children}) {
    // const url = "https://maps.googleapis.com/maps/api/js?&key=" + ApiKey() + "&libraries=places&language=en";
    return (
        <>
            {children}
            {/* <script
                async
                src={url}>                
            </script> */}
        </>
    );
}