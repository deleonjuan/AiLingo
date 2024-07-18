export const gemini = {
  colors: {
    bgBlack: "#000",
    bgGray: "#2e2e30",
    bgLightGray: "#4A4949",
    text: "#fff",
  },
};

type AppThemes = {
  gemini: typeof gemini;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}
