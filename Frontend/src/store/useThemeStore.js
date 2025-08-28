import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("friendchat-theme") || "coffee",
  setTheme: (theme) =>{ 
    localStorage.setItem("friendchat-theme", theme);
    set({theme})},
}))