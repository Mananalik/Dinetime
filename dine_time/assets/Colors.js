const tintColorLight = "#6C63FF"; // Soft vivid purple
const tintColorDark = "#F5A623";  // Warm amber for contrast
const primary = "#FF6584";        // Vibrant coral pink
const secondary = "#232946";      // Deep bluish slate

export const Colors = {
  light: {
    text: "#1E1E2E",         // Rich dark slate
    background: "#F7F7FB",   // Soft off-white
    tint: tintColorLight,
    icon: "#6B7280",         // Neutral gray
    tabIconDefault: "#A0A3B1",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#E0E0E0",         // Soft white
    background: "#0F172A",   // Almost black with navy tone
    tint: tintColorDark,
    icon: "#94A3B8",         // Muted gray-blue
    tabIconDefault: "#94A3B8",
    tabIconSelected: tintColorDark,
  },
  PRIMARY: primary,
  SECONDARY: secondary,
};
