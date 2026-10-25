import { createRouter, createWebHistory } from "vue-router";
import simulatorHandler from "../pages/simulatorHandler.vue";
import Embed from "../pages/embed.vue";

// The embedding platform serves a read-only project preview from its own page
// (apps/{id}/preview.html). That page is not on the /embed path, so let it opt
// into the embed view with ?view=embed instead of rewriting the document URL.
const previewMode =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("view") === "embed";

export const routes = [
  {
    path: "/embed/:projectId?",
    name: "embed",
    component: Embed,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "simulator",
    component: previewMode ? Embed : simulatorHandler,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
