import {defineStore} from "pinia";
import {ref} from "vue";

export type ToastStatus = "success" | "error" | "warning" | "info";
export type IconName = "alert-circle-outline" | "alert-outline" | "check-circle-outline" | "information-outline";

type ToastPayload = { timeout?: number, text: string };

interface IToast {
  id: number;
  status: ToastStatus;
  text: string;
  visible: boolean;
}

const defaultTimeout: number = 2000;
const createToast = (text: string, status: ToastStatus): IToast => ({
  id: Math.random() * 100_000,
  status: status,
  text: text,
  visible: true,
});

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<IToast[]>([]);

  const updateState = (payload: ToastPayload, status: ToastStatus) => {
    const {timeout, text} = payload;
    const toast = createToast(text, status);
    toasts.value.push(toast);
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== toast.id);
    }, timeout ?? defaultTimeout);
  };

  const success = (payload: ToastPayload) => updateState(payload, "success");
  const error = (payload: ToastPayload) => updateState(payload, "error");
  const warning = (payload: ToastPayload) => updateState(payload, "warning");
  const info = (payload: ToastPayload) => updateState(payload, "info");

  return {
    toasts,
    success,
    error,
    warning,
    info,
    updateState,
  };
});
