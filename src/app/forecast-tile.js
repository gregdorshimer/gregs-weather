export default function ForecastTile({ info }) {
    if (!info) return null;

    return (
        <div className="w-40 shrink-0 rounded-xl bg-white p-4 shadow">
            <img
                src={info.icon}
                alt=""
                className="mx-auto mb-2 h-16 w-16"
            />

            <h3 className="text-sm font-semibold text-slate-800">
                {info.name}
            </h3>

            <div className="mt-1 text-lg font-bold text-slate-900">
                {info.temperature}°{info.temperatureUnit}
            </div>

            <p className="mt-2 text-xs text-slate-600">
                {info.shortForecast}
            </p>
        </div>
    );
}
