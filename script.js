/* =========================================================
   Wattwise — navigation script
   Every link that should switch pages (the logo and the three
   nav links) has a data-page attribute, e.g. data-page="televisions".
   Clicking one hides every <section class="page">, then shows only
   the one whose id matches — using the plain HTML `hidden` attribute,
   which browsers hide by default. No extra CSS classes are needed.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link");
  const pageLinks = document.querySelectorAll("[data-page]");

  function showPage(pageId) {
    // Show only the page whose id matches; hide the rest.
    pages.forEach((page) => {
      page.hidden = page.id !== `page-${pageId}`;
    });

    // Highlight the nav link for the page that's now showing,
    // so the user can see which page they're on.
    navLinks.forEach((link) => {
      const isCurrent = link.dataset.page === pageId;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Jump back to the top, otherwise the new page could open
    // scrolled halfway down if the last page was taller.
    window.scrollTo(0, 0);
  }

  pageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPage(link.dataset.page);
    });
  });

  // Footer year, set automatically so it never needs manual updating.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Make sure the Home nav link starts out highlighted.
  showPage("home");
});
