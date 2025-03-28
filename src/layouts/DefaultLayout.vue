<script setup lang="ts">
import {ref} from "vue";
import {useThemeStore} from "@/stores/theme";
import {useUserStore} from "@/stores/user";
import {getAvatar} from "@/utils/avatar";
import Toaster from "@/components/Toaster.vue";

const themeStore = useThemeStore()
const userStore = useUserStore()

const user = userStore.getUser()
const avatar = getAvatar(user.id)

const drawer = ref(false)
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" floating elevation="10">
      <div class="d-flex align-center pa-4">
        <v-avatar image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.svg"/>
        <span class="text-h6 font-weight-medium">Campaign</span>
      </div>

      <div class="px-4 py-2">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          density="compact"
          label="Search"
          variant="outlined"
          bg-color="surface-light"
          hide-details
        />
      </div>

      <div class="px-2">
        <v-list density="comfortable" nav slim>
          <v-list-subheader title="Text" class="font-weight-bold"/>
          <v-list-item active rounded="lg" prepend-icon="mdi-folder" title="My Files" value="myfiles"/>
          <v-list-item rounded="lg" prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"/>
          <v-list-item rounded="lg" prepend-icon="mdi-star" title="Starred" value="starred"/>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar class="px-3" title="App">
      <template v-slot:append>
        <v-btn
          :icon="themeStore.themeIcon"
          :key="themeStore.themeIcon"
          @click="themeStore.toggleTheme"
        />
        <v-btn class="text-none me-2" height="48" icon slim>
          <v-avatar :icon="avatar.icon" :color="avatar.color" size="32"/>

          <v-menu activator="parent">
            <v-list density="compact" nav>
              <v-list-item append-icon="mdi-cog-outline" link title="Settings"/>

              <v-list-item append-icon="mdi-logout" link title="Logout"/>
            </v-list>
          </v-menu>
        </v-btn>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"/>
      </template>
    </v-app-bar>


    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>

    <Toaster/>
  </v-layout>
</template>


