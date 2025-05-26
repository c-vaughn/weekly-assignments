import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherApi } from 'openmeteo';

// Define interfaces for type safety
interface Location {
  lat: number;
  lng: number;
}

interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
}

interface ApiError {
  message: string;
  timestamp: string;
}

function WeatherRequest() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error(err.message);
        }
      );
    } else {
      console.error("Geolocation not available");
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/session', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          fetch('http://localhost:3000/profile', {
            credentials: 'include',
          })
            .then(res => {
              if (res.ok) return res.json();
              throw new Error('Not authenticated');
            })
            .then(data => {
              setUser(data);
              console.log(data);
            })
            .catch(() => setUser(null));
            navigate('/');
        }
      });
  }, [navigate]);

  const validateWeatherData = (data: any): data is WeatherData => {
    if (!data) return false;
    
    const hasRequiredFields = 
      'temperature' in data &&
      'weatherCode' in data &&
      'windSpeed' in data;

    const hasValidTypes = 
      typeof data.temperature === 'number' &&
      typeof data.weatherCode === 'number' &&
      typeof data.windSpeed === 'number';

    const hasValidRanges = 
      !isNaN(data.temperature) &&
      data.weatherCode >= 0 &&
      data.weatherCode <= 99 &&
      data.windSpeed >= 0;

    return hasRequiredFields && hasValidTypes && hasValidRanges;
  };

  const fetchWeather = async () => {
    if (!location.lat || !location.lng) {
      setError({
        message: 'Location coordinates are not available',
        timestamp: new Date().toISOString()
      });
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching weather for coordinates:', {
        latitude: location.lat,
        longitude: location.lng
      });

      const params = {
        "latitude": location.lat,
        "longitude": location.lng,
        "current": ["temperature_2m", "weather_code", "wind_speed_10m"],
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
      };
      
      const url = "https://api.open-meteo.com/v1/forecast";
      console.log('Making API request to:', url);
      
      const responses = await fetchWeatherApi(url, params);
      console.log('Raw API response:', responses);
      
      if (!responses || responses.length === 0) {
        throw new Error('No response received from weather API');
      }

      const response = responses[0];
      const current = response.current();
      
      if (!current) {
        throw new Error('Current weather data is missing from response');
      }

      const weatherData = {
        temperature: current.variables(0)?.value() ?? null,
        weatherCode: current.variables(1)?.value() ?? null,
        windSpeed: current.variables(2)?.value() ?? null,
      };

      console.log('Processed weather data:', weatherData);

      if (!validateWeatherData(weatherData)) {
        throw new Error('Invalid weather data format received');
      }

      setCurrentWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError({
        message: error instanceof Error ? error.message : 'Failed to fetch weather data',
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  // Weather code to description mapping
  const getWeatherDescription = (code: number) => {
    const weatherCodes: { [key: number]: string } = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };
    return weatherCodes[code] || "Unknown";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ color: 'white' }}>
        {location.lat ? (
          <p>
            Latitude: {location.lat.toFixed(4)}, Longitude: {location.lng.toFixed(4)}
          </p>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>
      <div style={{ color: 'white' }}>
        <button 
          onClick={fetchWeather}
          disabled={loading || !location.lat}
        >
          {loading ? 'Fetching Weather...' : 'Fetch Weather'}
        </button>
        
        {error && (
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            backgroundColor: 'rgba(255, 0, 0, 0.1)', 
            border: '1px solid red',
            borderRadius: '4px'
          }}>
            <p>Error: {error.message}</p>
            <p style={{ fontSize: '0.8em' }}>Time: {new Date(error.timestamp).toLocaleTimeString()}</p>
          </div>
        )}
        
        {currentWeather && (
          <div style={{ marginTop: '20px' }}>
            <h3>Current Weather</h3>
            <p>Temperature: {currentWeather.temperature.toFixed(1)}°F</p>
            <p>Conditions: {getWeatherDescription(currentWeather.weatherCode)}</p>
            <p>Wind Speed: {currentWeather.windSpeed.toFixed(1)} mph</p>
            <p style={{ fontSize: '0.8em', color: '#aaa' }}>
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherRequest;