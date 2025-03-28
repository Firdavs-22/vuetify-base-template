<script setup lang="ts">

import {type ToastStatus, type IconName, useToastStore} from "@/stores/toast";
import {storeToRefs} from "pinia";

const toastStore = useToastStore();

const toastColorMap: Record<ToastStatus, string> = {
  error: "red",
  warning: "yellow",
  success: "green",
  info: "blue",
};

const toastIconMap: Record<ToastStatus, IconName> = {
  error: "alert-circle-outline",
  warning: "alert-outline",
  success: "check-circle-outline",
  info: "information-outline",
};

const toastsRef = storeToRefs(toastStore);

</script>

<template>
  <div class="notificationContainer">
    <v-slide-y-transition group>
      <v-alert
        variant="tonal"
        v-for="toast in toastsRef.toasts.value"
        :key="toast.id"
        :icon="'mdi-'+toastIconMap[toast.status]"
        :color="toastColorMap[toast.status]"
        :text="toast.text"
        closable
        density="compact"
      />
    </v-slide-y-transition>
  </div>
</template>


<style scoped>
.notificationContainer {
  position: fixed;
  top: 5em;
  right: 1.5em;
  display: grid;
  grid-gap: 0.5em;
  z-index: 99999;
}
</style>
