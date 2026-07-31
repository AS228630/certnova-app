// A deterministic "random" shuffle: same seed always produces the same
// order, different seeds produce different orders. Used so a shuffle
// can be recomputed from render props (no extra state to store per
// question) while still changing whenever the seed changes - e.g. once
// per "Gemischt wiederholen" click, or once per question id for a
// shuffle that should look random but stay stable within a session.
export function seededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
