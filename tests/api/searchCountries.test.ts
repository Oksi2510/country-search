import { describe, test, expect, vi, beforeEach } from 'vitest';
import { searchCountries } from '../../src/services/searchCountries';
import israel from '../../tests/fixtures/israel.json';
import { HttpError } from '../../src/utils/HttpError';
import { API_URL } from '../../src/constants/api';

describe('searchCountries', () => {
  const signal = new AbortController().signal;
  const mockFetch = vi.fn();
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockResolvedValue(new Response(JSON.stringify(israel), { status: 200 }));

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue(new Response(JSON.stringify(israel), { status: 200 }));
  });

  test('Функция отправляет запрос с переданной поисковой строкой', async () => {
    await searchCountries('Israel', signal);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}Israel`, { signal });
  });

  test('Функция передаёт signal в fetch', async () => {
    await searchCountries('Israel', signal);
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ signal }));
  });

  test('При HTTP 200 возвращает массив стран', async () => {
    const res = await searchCountries('Israel', signal);
    expect(res).toEqual(israel);
  });

  test('При HTTP 404 возвращает пустой массив', async () => {
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(israel), { status: 404 }));
    const res = await searchCountries('Israel', signal);
    expect(res).toEqual([]);
  });

  test('При другом HTTP-статусе выбрасывает HttpError', async () => {
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(israel), { status: 418 }));
    const res = searchCountries('Israel', signal);
    await expect(res).rejects.toThrow(HttpError);
  });

  test('При сетевой ошибке отклоняет Promise', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    const res = searchCountries('Israel', signal);
    await expect(res).rejects.toThrow();
  });
});
