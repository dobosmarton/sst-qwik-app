import { Magic } from 'magic-sdk';

export const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY || '', {
  extensions: [],
});
