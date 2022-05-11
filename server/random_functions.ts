
/**
 * "MurmurHash3's mixing function"
 * taken from https://stackoverflow.com/a/47593316
 * generates the root function?
 * @param str The seed— must be a string.
 * @returns a function or something?
 */
export function xmur3(str : string) {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

/**
 * "Mulberry32 is a simple generator with a 32-bit state, but is extremely fast 
 * and has good quality randomness"
 * taken from https://stackoverflow.com/a/47593316
 * from the root function.
 * @param a the seed: must be taken from the xmur function.
 * @returns 
 */
export function mulberry32(a : number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}