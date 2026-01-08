View NWS forecasts by city.

Using use-places-autocomplete, 

React-select AsyncSelect component:
https://react-select.com/async

NWS API docs:
Docs home: https://www.weather.gov/documentation/services-web-api
FAQ: https://weather-gov.github.io/api/gridpoints

Find coordinates on the map, or use Google Places API:
https://gps-coordinates.org/

Find forecast office codes, or use gridpointURL below: 
https://en.wikipedia.org/wiki/List_of_National_Weather_Service_Weather_Forecast_Offices

gridpointURL: Get a grid loc and office code (properties.gridX, and properties.gridY, and
properties.gridId) given lat, lng:
https://api.weather.gov/points/43.65%2C-70.27
return GYX, 76, 59 (Portland, ME), among other data

forecastURL: Get forecast given office code and gridpoints:
https://api.weather.gov/gridpoints/GYX/31,80/forecast
https://api.weather.gov/gridpoints/GYX/76,59/forecast