export const simpleHash = (s: string, m: number = 1e9 + 9) => {
  const p = 53;

  let hash_val = 0;
  let pow_p = 1;

  for (let i = 0; i < s.length; i++) {
    hash_val = (hash_val + s.charCodeAt(i) * pow_p) % m;
    pow_p = (p * pow_p) % m;
  }

  return hash_val;
};
