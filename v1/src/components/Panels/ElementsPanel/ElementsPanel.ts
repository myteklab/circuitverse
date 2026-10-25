import { simulationArea } from "#/simulator/src/simulationArea";
import modules from "#/simulator/src/modules";
import { uxvar } from "#/simulator/src/ux";

export function createElement(elementName: string) {
  if (simulationArea.lastSelected?.newElement) simulationArea.lastSelected.delete();
  var obj = new modules[elementName]();
  simulationArea.lastSelected = obj;
  uxvar.smartDropXX += 70;
  if (uxvar.smartDropXX / globalScope.scale > width) {
    uxvar.smartDropXX = 50;
    uxvar.smartDropYY += 80;
  }
}

// Element icon SVGs are shipped as static files under public/img/ and served at
// <base>/img/<name>.svg. We reference them via BASE_URL so the path is correct
// regardless of where the app is mounted. (The original dynamic
// `new URL(`...${name}.svg`, import.meta.url)` couldn't be statically bundled
// by Vite and resolved to the wrong location.)
export function getImgUrl(elementName: string) {
  return `${import.meta.env.BASE_URL}img/${elementName}.svg`;
}
