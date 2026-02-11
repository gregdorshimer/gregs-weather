import { LineChart, XAxis, YAxis, Line, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceLine, ReferenceArea } from "recharts";

export default function ForecastGraph({hourlyForecast}) {
    // extract just periods from the forecast object and format into a new object with the correct fields
    // to be used with Rechart:
    const periods = hourlyForecast.properties.periods.map(period => {
        return {
            startTime: period.startTime,
            temp: period.temperature,
            precip: period.probabilityOfPrecipitation.value,
        };
    });

    // get an array of startTimes representing the periods that start new days (i.e. when hours == 0) for drawing vertical lines
    const dayBounds = periods
        .filter(period => new Date(period.startTime).getHours() == 0)
        .map(period => period.startTime);

    // get the nighttime ranges, represented as an array of pairs, { x1: startTime1, x2: startTime2 }
    const nightRanges = [];
    // helper:
    const hour = (t) => new Date(t).getHours();
    // if first period is after 6pm (during the night):
    if (hour(periods[0].startTime) > 18) {
        const firstSix = periods.find(p => hour(p.startTime) == 6);
        if (firstSix) {
            nightRanges.push({
                x1: periods[0].startTime,
                x2: firstSix.startTime
            });
        }
    }
    // if first period is during the day:
    for (let i = 0; i < periods.length; i++) {
        if (hour(periods[i].startTime) == 18) {
            const nextSix = periods
                .slice(i + 1)
                .find(period => hour(period.startTime) == 6);

            if (nextSix) {
                nightRanges.push({
                    x1: periods[i].startTime,
                    x2: nextSix.startTime
                });
            }
        }
    }

    // get an array of startTimes for all periods that are at noon
    const noonTicks = periods
        .filter(period => new Date(period.startTime).getHours() == 12)
        .map(period => period.startTime);
    // helper to format the label
    const formatNoonLabel = (value) => {
        const d = new Date(value);
        const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
        const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return `${weekday}, ${monthDay}`;
    };

    // create an array of ticks for the y-axis
    const maxTemp = Math.ceil(Math.max(...periods.map(p => p.temp)) / 10) * 10;
    const minTemp = Math.floor(Math.min(...periods.map(p => p.temp)) / 10) * 10;
    const ticks = [];
    for (let i = minTemp; i <= maxTemp; i += 10) {
        ticks.push(i);
    }
    
    return (
        <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={periods}
                    margin={{
                        top: 5, right: 0, left: 0, bottom: 5
                    }}
                >
                    <XAxis
                        dataKey="startTime"
                        ticks={noonTicks}
                        tickFormatter={formatNoonLabel}
                        tickMargin={5}
                    />
                    <YAxis
                        ticks={ticks}
                        orientation="left"
                    />
                    <YAxis
                        yAxisId="right"
                        ticks={[25, 50, 75, 100]}
                        orientation="right"
                        domain={[0, 100]}
                        tickFormatter={(v) => `${v}%`}
                    />
                    <Line type="monotone" dataKey="precip" yAxisId="right" name="Chance of Precip. (%)" dot={false} stroke="#03a218" />
                    <Line type="monotone" dataKey="temp" name="Temp. (°F)" dot={false} stroke="#d20703" />

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <ReferenceLine y={32} stroke="#3546ff82" />
                    <ReferenceLine y={0} stroke="#5ed7fff2" />
                    {dayBounds.map((dayBound, index) => (
                        <ReferenceLine key={`${index}-${dayBound}`} x={dayBound} stroke="#b6b6b6" />
                    ))}
                    {nightRanges.map((r, index) => (
                        <ReferenceArea
                            key={`${index}-${r}`}
                            x1={r.x1}
                            x2={r.x2}
                            fill="rgba(0, 0, 0, 0.08)"
                            ifOverflow="hidden"
                        />
                    ))}

                    <Tooltip
                        labelFormatter={(value) => {
                            const d = new Date(value);
                            return d.toLocaleString("en-US", {
                                hour: "numeric",
                                hour12: true,
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            });
                        }}
                    />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}