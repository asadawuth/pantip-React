import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";

export function useAuth() {
  return useContext(AuthContext);
}
