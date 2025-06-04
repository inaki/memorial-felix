import { atom } from "jotai";

export const authAtom = atom(
  typeof window !== "undefined" &&
    localStorage.getItem("authenticated") === "true"
);

authAtom.onMount = (setAtom) => {
  const handler = () => {
    setAtom(localStorage.getItem("authenticated") === "true");
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
