import { weatherApiKey, weatherGeoApiUrl } from "../../../services/searchService";

type loadOptionTypes = {
  options: {
    label: string;
    value: string;
  }[];
};

type cityType = {
  lat: number;
  lon: number;
  name: string;
  country: string;
};

function useSearch() {
  const loadOptions = async (inputValue: string): Promise<loadOptionTypes> => {
    
    if (!inputValue.trim()) {
      return { options: [] };
    }

    try {
      const response = await fetch(
        `${weatherGeoApiUrl}/direct?q=${inputValue}&limit=10&appid=${weatherApiKey}`,
      );
      const result = await response.json();
      console.log("result:", result);

      return {
        options: result.map((city: cityType) => ({
          value: `${city.lat} ${city.lon}`,
          label: `${city.name}, ${city.country}`,
        })),
      };
    } catch (error: unknown) {
      console.error("Error fetching search results:", error);
    }

    return {
      options: [],
    };
  };

  return { loadOptions };
}

export default useSearch;
