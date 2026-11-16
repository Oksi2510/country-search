import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from '../../src/utils/debounce';

describe('debounce', () => {
  const testFn = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('Функция не вызывается сразу, а ждёт окончания задержки', () => {
    const result = debounce(testFn, 500);
    result();
    expect(testFn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(500);
    expect(testFn).toHaveBeenCalledTimes(1);
  });

  test('Если вызвать её несколько раз до окончания задержки, предыдущий таймер сбрасывается', () => {
    const result = debounce(testFn, 500);
    result();
    vi.advanceTimersByTime(100);
    result();
    vi.advanceTimersByTime(100);
    result();
    vi.advanceTimersByTime(499);
    expect(testFn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(500);
    expect(testFn).toHaveBeenCalledTimes(1);
  });

  test('После завершения задержки функция вызывается только один раз, с последними аргументами', () => {
    const result = debounce(testFn, 500);
    result('first');
    vi.advanceTimersByTime(100);
    result('second');
    vi.advanceTimersByTime(100);
    result('last');
    vi.advanceTimersByTime(500);
    expect(testFn).toHaveBeenCalledTimes(1);
    expect(testFn).toHaveBeenCalledWith('last');
  });
});
