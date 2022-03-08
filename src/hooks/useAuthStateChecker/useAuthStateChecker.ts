import { Auth, onAuthStateChanged, User } from "firebase/auth";

export function useAuthStateChecker(auth: Auth, setUser: (value: React.SetStateAction<User | undefined>) => void) {
  onAuthStateChanged(auth, (currentUser): void => {
    currentUser && setUser(currentUser);
  });
}