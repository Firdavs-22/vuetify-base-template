import type {RouteRecordRaw} from "vue-router";
import Home from "@/views/Home.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DefaultLayout,
    name: "Default Layout",
    children: [
      {
        path: "",
        name: "Home Page",
        component: Home,
      }
    ]
  }
]

export default routes;
