import { generateSlug, SLUG_LENGTH } from './slug';

describe('generateSlug', () => {
  it('returns a string of the configured length', () => {
    const slug = generateSlug();
    expect(slug).toHaveLength(SLUG_LENGTH);
  });

  it('returns a different value on each call', () => {
    const a = generateSlug();
    const b = generateSlug();
    expect(a).not.toBe(b);
  });

  it('uses only URL-safe characters', () => {
    const slug = generateSlug();
    expect(slug).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});
