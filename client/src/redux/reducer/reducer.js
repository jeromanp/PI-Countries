import {
  GET_COUNTRIES,
  GET_COUNTRY,
  SEARCH_NAME,
  ORDER_ALPHABETIC,
  FILTER_CONTINENTS,
  RESET_STATE,
  ORDER_POPULATION,
  FILTER_BY_ACTIVITY,
  GET_ALL_ACTIVITIES
} from "../actions/type_actions";

const initialState = {
  countries: [],
  countriesCopy: [],
  filterCountries:[]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return { ...state, countries: action.payload };

    case GET_COUNTRY:
      return { ...state, country: action.payload };

    case SEARCH_NAME:
      return { ...state, countries: action.payload };

    case FILTER_CONTINENTS:
      const countriesCopy = [...state.countries];
      console.log("PREV",countriesCopy);
      const filteredCountries = countriesCopy.filter(country => country.continent === action.payload)
      //console.log("RESULT",action.payload, filteredCountries);
      //console.log("COPY",countriesCopy);
      return {
        ...state,
        countries: filteredCountries,
        countriesCopy: countriesCopy        
      };      

    case ORDER_ALPHABETIC:
      const countriesAlpha = [...state.countries];
      let orderedCountries;
      if (action.payload === "AZ") {
        orderedCountries = countriesAlpha.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (action.payload === "ZA") {
        orderedCountries = countriesAlpha.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else {
        orderedCountries = countriesAlpha;
      }
      return { ...state, countries: orderedCountries };

    case ORDER_POPULATION:
      const filterPopulation = [...state.countries];
      if (action.payload === "Higher Population") {
        filterPopulation.sort((a, b) => {
          if (a.population > b.population) {
            return -1;
          }
          if (a.population < b.population) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "Lower Population") {
        filterPopulation.sort((a, b) => {
          if (a.population < b.population) {
            return -1;
          }
          if (a.population > b.population) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        countries: filterPopulation,
      };
    
    case FILTER_BY_ACTIVITY:
      return{
        ...state,
        countries: action.payload
      }
      case GET_ALL_ACTIVITIES:
        return { ...state, countries: action.payload };
            

    case RESET_STATE:
      const init = [...state.countriesCopy];
      //console.log("INIT", init);
      return { ...state, countries: init };

    default:
      return { ...state };
  }
};

export default rootReducer;
