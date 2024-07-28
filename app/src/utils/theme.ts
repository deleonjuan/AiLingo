export const gemini = {
  colors: {
    bgBlack: "#000",
    bgGray: "#222327",
    bgLightGray: "#4A4949",
    text: "#fff",
    duoBlue: "#131f24",
    duoGreen: "#58a700",
    duoYellow: "#ffd900",
    danger: "red",
  },
};

type AppThemes = {
  gemini: typeof gemini;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}
