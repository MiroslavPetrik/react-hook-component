export function previous(initial = null) {
  let prev = initial;

  return next => {
    const curr = prev;
    prev = next;
    return curr;
  };
}

export function noop() {}

export function once(fn) {
  let called = false;
  return () => {
    if (!called) {
      called = true;
      return fn();
    }
  };
}
