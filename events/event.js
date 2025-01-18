document.addEventListener("DOMContentLoaded", () => {
  // Gallery Filter functionality
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

  // Scrolling functionality (infinite + manual + touch)
  const scrollingContainer = document.querySelector('.scrolling-container');
  const institutions = document.querySelectorAll('.institution');
  const totalCards = institutions.length;

  // Clone the cards for continuous scroll
  institutions.forEach(institution => {
    const clonedInstitution = institution.cloneNode(true);
    scrollingContainer.appendChild(clonedInstitution);
  });

  // Manual Scrolling (Left and Right Buttons)
  const scrollLeftButton = document.querySelector('.scroll-left');
  const scrollRightButton = document.querySelector('.scroll-right');

  let scrollAmount = 0;
  const scrollDistance = 200; // Adjust the distance of scrolling (px)

  // Scroll left
  scrollLeftButton.addEventListener('click', () => {
    scrollAmount -= scrollDistance;
    if (scrollAmount < 0) scrollAmount = 0; // Prevent scrolling before the start
    scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
  });

  // Scroll right
  scrollRightButton.addEventListener('click', () => {
    scrollAmount += scrollDistance;
    if (scrollAmount > (scrollingContainer.scrollWidth / 2)) {
      scrollAmount = 0; // Reset to the first card after the last card
    }
    scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
  });

  // Continuous Scroll Reset
  setInterval(() => {
    if (scrollAmount === 0) {
      scrollingContainer.style.transition = "none"; // Disable transition for reset
      scrollingContainer.style.transform = `translateX(0px)`;
      setTimeout(() => {
        scrollingContainer.style.transition = "transform 0.5s ease-in-out";
      }, 50); // Re-enable transition after reset
    }
  }, 30000); // Reset every 30 seconds (adjustable)

  // Touch Scrolling (For Mobile/Tablet)
  let touchStartX = 0;
  let touchEndX = 0;

  scrollingContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  scrollingContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleTouchSwipe();
  });

  function handleTouchSwipe() {
    if (touchStartX - touchEndX > 50) {
      // Swiped Left
      scrollAmount += scrollDistance;
      if (scrollAmount > (scrollingContainer.scrollWidth / 2)) {
        scrollAmount = 0; // Reset to the first card after the last card
      }
      scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
    } else if (touchEndX - touchStartX > 50) {
      // Swiped Right
      scrollAmount -= scrollDistance;
      if (scrollAmount < 0) scrollAmount = 0; // Prevent scrolling before the start
      scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
    }
  }

  // To make sure infinite loop behavior works fine when the user stops the touch scroll
  let touchInProgress = false;
  scrollingContainer.addEventListener('touchmove', () => {
    touchInProgress = true;
  });

  // After a touch scroll ends, trigger continuous loop again
  setInterval(() => {
    if (!touchInProgress) {
      if (scrollAmount === 0) {
        scrollingContainer.style.transition = "none"; // Disable transition for reset
        scrollingContainer.style.transform = `translateX(0px)`;
        setTimeout(() => {
          scrollingContainer.style.transition = "transform 0.5s ease-in-out";
        }, 50); // Re-enable transition after reset
      }
    }
    touchInProgress = false;
  }, 1000);
});
