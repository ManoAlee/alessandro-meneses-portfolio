import { createContext } from "react";

export const SystemContext = createContext({
    matrixMode: false,
    toggleMatrix: () => {},
    isLowPower: false,
    toggleLowPower: () => {}
});
