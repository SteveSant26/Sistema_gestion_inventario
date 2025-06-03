import { loadComponent } from "/static/js/utils/load-component.js";

import { authService } from "/static/js/services/auth.js";


function adjustUIForRole() {

  if (authService.isAdmin()) {
    document.body.classList.add("admin");
  } else {
    document.body.classList.remove("admin");
  }
}


loadComponent("#sidebar-content-container", "/components/sidebar/sidebar.html");
adjustUIForRole();

