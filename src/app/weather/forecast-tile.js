export default function ForecastTile({info, url}) {
    console.log(url);

    return (
        <>
            forecast tile
            <img src={url} alt="loading icon..." />
            {/* {JSON.parse(info)} */}
        </>
    );
}