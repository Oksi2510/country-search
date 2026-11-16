import { describe, test, expect } from 'vitest';
import { HttpError } from '../../src/utils/HttpError';

describe('HttpError', () => {
  test('Созданный HttpError является экземпляром Error', () => {
    const error = new HttpError(404, 'Not Found');
    expect(error).toBeInstanceOf(Error);
  });
  test('Ошибка сохраняет переданный HTTP-статус', () => {
    const error = new HttpError(404, 'Not Found');
    expect(error.status).toBe(404);
  });
  test('Ошибка сохраняет переданное сообщение', () => {
    const error = new HttpError(404, 'Not Found');
    expect(error.message).toBe('Not Found');
  });
});
