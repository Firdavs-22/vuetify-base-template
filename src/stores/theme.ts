import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useToastStore} from "@/stores/toast";

type Theme = "dark" | "light";

export const useThemeStore = defineStore("app", () => {
  const toastStore = useToastStore();
  const defaultTheme: Theme = localStorage.getItem("theme") as Theme || "dark";
  const theme = ref<Theme>(defaultTheme);

  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";

    const random = Math.floor(Math.random() * 4);
    switch (random) {
      case 1:
        toastStore.success({text: "Theme changed!"});
        break;
      case 2:
        toastStore.error({text: "Theme changed!"});
        break;
      case 3:
        toastStore.warning({text: "Theme changed!"});
        break;
      default:
        toastStore.info({text: "Theme changed!"});
    }

    localStorage.setItem("theme", theme.value);
  }

 const themeIcon = computed(() => {
    return theme.value === "dark" ? "mdi-weather-night" : "mdi-weather-sunny";
 });

  return {
    theme,
    toggleTheme,
    themeIcon
  };
});
