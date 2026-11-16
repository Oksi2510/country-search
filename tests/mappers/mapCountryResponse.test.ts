import { describe, test, expect } from 'vitest';
import { mapCountryResponse } from '../../src/mappers/mapCountryResponse';
import israel from '../fixtures/israel.json';
import switzerland from '../fixtures/switzerland.json';
import type { CountryApiResponse } from '../../src/types/api';

describe('mapCountryResponse', () => {
  const israelRes: CountryApiResponse = israel[0];
  const switzerlandRes: CountryApiResponse = switzerland[0];

  test('Mapper возвращает название страны', () => {
    const res = mapCountryResponse(israelRes);
    expect(res.name).toBe('Israel');
  });

  test('Mapper возвращает флаг', () => {
    const res = mapCountryResponse(israelRes);
    expect(res.flag).toBe('https://flagcdn.com/il.svg');
  });

  test('Mapper возвращает столицу и регион', () => {
    const res = mapCountryResponse(israelRes);
    expect(res.capital).toBe('Jerusalem');
    expect(res.region).toBe('Asia');
  });

  test('Mapper возвращает население', () => {
    const res = mapCountryResponse(israelRes);
    expect(res.population).toBe(9216900);
  });
  test('Mapper корректно обрабатывает несколько языков', () => {
    const res = mapCountryResponse(israelRes);
    expect(res.languages).toEqual(['Hebrew (modern)', 'Arabic']);
  });

  test('Mapper обрабатывает страну без столицы', () => {
    const res = mapCountryResponse(switzerlandRes);
    expect(res.capital).toBe('No capital');
  });
});
