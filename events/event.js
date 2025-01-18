document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".gallery-filters li");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove the active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("filter-active"));

      // Add the active class to the clicked button
      button.classList.add("filter-active");

      // Get the filter value from the clicked button
      const filterValue = button.getAttribute("data-filter");

      // Show or hide gallery items based on the filter value
      galleryItems.forEach(item => {
        if (filterValue === "*" || item.classList.contains(filterValue.slice(1))) {
          item.style.display = "block"; // Show item
        } else {
          item.style.display = "none"; // Hide item
        }
      });
    });
  });
});