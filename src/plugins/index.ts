import vuetify from '@/plugins/vuetify'
import pinia from "@/plugins/pinia";
import router from "@/plugins/router";

import type {App} from 'vue'

export function registerPlugins(app: App) {
    app
        .use(router)
        .use(vuetify)
        .use(pinia)
}
