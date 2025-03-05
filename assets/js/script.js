document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("#navbarmain .nav-link");
  const viewAllBtn = document.getElementById("viewAllBtn");
  const hiddenItems = document.querySelectorAll(".service-item-hidden");
  let isExpanded = false;

  // Navigation: Highlight Active Link
  let currentPath = window.location.pathname;

  // Normalize the current path
  if (currentPath.endsWith("/") || currentPath === "") {
    currentPath = "/index.html";
  } else if (!currentPath.endsWith(".html")) {
    currentPath += ".html";
  }

  // Extract just the filename from the path
  currentPath = currentPath.split("/").pop();

  navLinks.forEach((link) => {
    let linkPath = link.getAttribute("href");
    linkPath = linkPath.split("/").pop();

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  viewAllBtn?.addEventListener("click", function () {
    isExpanded = !isExpanded;

    hiddenItems.forEach((item) => {
      item.style.display = isExpanded ? "block" : "none";
    });

    // Update button text and icon
    viewAllBtn.innerHTML = isExpanded ? '<i class="ri-subtract-line me-2"></i><span>Show Less</span>' : '<i class="ri-add-line me-2"></i><span>View All Services</span>';
  });
});
