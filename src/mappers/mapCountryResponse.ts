import type { CountryApiResponse } from '../types/api';
import type { CountryCard } from '../types/country';

export function mapCountryResponse(raw: CountryApiResponse): CountryCard {
  const card: CountryCard = {
    name: raw.name,
    flag: raw.flags.svg,
    capital: raw.capital === undefined ? 'No capital' : raw.capital,
    region: raw.region,
    population: raw.population,
    languages: raw.languages.map((lang) => lang.name),
  };
  return card;
}
