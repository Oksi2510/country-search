export function debounce<T extends (...args: never[]) => void>(fn: T, delay: number) {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
