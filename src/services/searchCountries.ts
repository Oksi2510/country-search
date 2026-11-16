import type { CountryApiResponse } from '../../src/types/api';
import { API_URL } from '../constants/api';
import { HttpError } from '../utils/HttpError';

export function searchCountries(query: string, signal: AbortSignal): Promise<CountryApiResponse[]> {
  return fetch(`${API_URL}${query}`, { signal }).then(async (response): Promise<CountryApiResponse[]> => {
    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new HttpError(response.status, `Ошибка номер ${response.status}`);
    }

    return await response.json();
  });
}
