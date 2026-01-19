export async function GET(request, context) {
    const params = await context.params; // need to await params because it's considered a promise in React
    const path = params.path.join("/");
    const url = `https://tile.openweathermap.org/${path}?appid=${process.env.OPENWEATHER_API_KEY}`;
    console.log(url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return new Response("Tile fetch error", { status: 502 });
        }

        return new Response(response.body, {
            status: response.status,
            headers: {
                "Content-Type": response.headers.get("content-type") || "image/png",
                "Cache-Control": "public, max-age=300",
            },
        });
    } catch (err) {
        console.error("Tile proxy error:", err);
        return new Response("Tile proxy failed", { status: 500 });
    }
}
