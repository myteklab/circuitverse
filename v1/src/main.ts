import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import { createPinia } from "pinia";
import { loadFonts } from "./plugins/webfontloader";
import i18n from "./locales/i18n";

import "bootstrap";

import "./globalVariables";

import "./styles/css/main.stylesheet.css";
import "../../node_modules/bootstrap/scss/bootstrap.scss";
import "./styles/color_theme.scss";
import "./styles/simulator.scss";
import "./styles/tutorials.scss";
import "@fortawesome/fontawesome-free/css/all.css";

// Host-agnostic save/restore API for an embedding platform. generateSaveData()
// returns the full project (all circuits) as a plain object; load() rebuilds
// from it. setName=false avoids the "name your project" modal.
import { generateSaveData, generateImage } from "./simulator/src/data/save";
import loadProject from "./simulator/src/data/load";
import { scopeList } from "./simulator/src/circuit";

loadFonts();

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.use(i18n);
app.mount("#app");

// Expose save/restore to an embedding host (the platform adapter calls these).
(window as any).cvSerialize = async (): Promise<string> => {
  const data = await generateSaveData("Untitled", false);
  return JSON.stringify(data);
};
(window as any).cvRestore = (json: string): void => {
  if (!json) return;
  try {
    loadProject(JSON.parse(json));
  } catch (e) {
    console.warn("[circuitverse] restore failed", e);
  }
};
// Does any circuit in the loaded project contain a Clock? The read-only preview
// uses this to drop the clock controls from purely combinational projects, where
// they do nothing. scopeList is reassigned on load, so read it through the live
// module binding rather than caching a reference.
(window as any).cvHasClock = (): boolean => {
  try {
    return Object.keys(scopeList).some(
      (id) => (scopeList[id] as any)?.Clock?.length > 0
    );
  } catch (e) {
    return true; // unknown: keep the controls
  }
};
// Render the whole circuit framed to its bounding box (the "full" view), so a
// project thumbnail shows the components, not the current scrolled viewport.
// Returns a data: URL; restores the user's view afterward (handled by generateImage).
(window as any).cvPreviewImage = (): string | null => {
  try {
    const url = generateImage("png", "full", false, 1, false) as string;
    // An empty circuit yields a degenerate image (no bounding box). Treat as
    // "no framed preview" so the host falls back to the plain viewport.
    if (!url || url.indexOf("data:image/png") !== 0 || url.length < 256) return null;
    return url;
  } catch (e) {
    console.warn("[circuitverse] preview image failed", e);
    return null;
  }
};
