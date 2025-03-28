<template>
  <v-app :theme="appStore.theme">
    <router-view/>
  </v-app>
</template>

<script setup lang="ts">
import {useThemeStore} from "@/stores/theme";

const appStore = useThemeStore()
</script>
