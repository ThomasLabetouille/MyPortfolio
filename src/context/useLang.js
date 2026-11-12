import { useContext } from "react";
import { LangContext } from "./langContext";

export function useLang() {
  return useContext(LangContext);
}
