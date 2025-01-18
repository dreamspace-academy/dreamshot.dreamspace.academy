document.addEventListener("DOMContentLoaded", () => {
  const scrollingContainer = document.querySelector('.scrolling-container');
  const institutions = document.querySelectorAll('.institution');

  // Clone cards only once to achieve seamless scrolling
  institutions.forEach(institution => {
    const clonedInstitution = institution.cloneNode(true);
    scrollingContainer.appendChild(clonedInstitution);
  });

  // Optionally, you could also adjust the width of the scrolling container 
  // to be large enough to accommodate two sets of cards. 
  // This can be done dynamically based on the number of institutions, if needed.

  // Gallery Filter functionality (same as before)
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
