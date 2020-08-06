import { Grid } from "antd";
const { useBreakpoint } = Grid;

export const useCurrentBreakpoint = () => {
  const screens = useBreakpoint();
  const activeScreens = Object.entries(screens).filter((screen) => !!screen[1]);
  if (activeScreens.length > 0) {
    const biggerScreen = activeScreens[activeScreens.length - 1][0];
    return biggerScreen;
  }
  return null;
};
