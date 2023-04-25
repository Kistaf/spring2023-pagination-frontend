import "https://unpkg.com/navigo";
import { loadTemplate, adjustForMissingHash, setActiveLink, renderTemplate } from "./utils.js";

import { load as loadPaginated } from "./pages/paginated/index.js";
import { load as loadNonPaginated } from "./pages/non_paginated/index.js";

window.addEventListener("load", async () => {
  const templatePaginated = await loadTemplate("./pages/paginated/index.html");
  const templateNonPaginated = await loadTemplate("./pages/non_paginated/index.html");

  const router = new Navigo("/", { hash: true });
  window.router = router;

  adjustForMissingHash();
  router
    .hooks({
      before(done, match) {
        setActiveLink("topnav", match.url);
        done();
      },
    })
    .on({
      "/": () => {
        renderTemplate(templateNonPaginated, "content");
        loadNonPaginated();
      },
      "/paginated": () => {
        renderTemplate(templatePaginated, "content");
        loadPaginated();
      },
    })
    .notFound(() => renderTemplate("No page for this route found", "content"))
    .resolve();
});

window.onerror = (e) => alert(e);
