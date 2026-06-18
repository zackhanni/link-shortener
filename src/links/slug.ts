import { nanoid } from 'nanoid';

export const SLUG_LENGTH = 7;

export function generateSlug(): string {
  return nanoid(SLUG_LENGTH);
}
