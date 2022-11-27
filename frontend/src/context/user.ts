import { createContext } from '@builder.io/qwik';
import { MagicUserMetadata } from 'magic-sdk';

export interface UserState {
  loading: boolean;
  user: MagicUserMetadata | null;
}

// Create a new context descriptor
export const UserContext = createContext<UserState>('user-context');
