document.addEventListener('DOMContentLoaded', () => {
  // Gallery Filter functionality
  const filters = document.querySelectorAll('.gallery-filters li');
  const items = document.querySelectorAll('.gallery-item');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Remove active class from all filters
      filters.forEach(f => f.classList.remove('filter-active'));
      // Add active class to the clicked filter
      filter.classList.add('filter-active');

      const filterValue = filter.getAttribute('data-filter');
      
      // Show or hide items based on filter
      items.forEach(item => {
        if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Infinite Scrolling functionality
  const scrollingContainer = document.querySelector('.scrolling-container');
  const scrollLeftButton = document.querySelector('.scroll-left');
  const scrollRightButton = document.querySelector('.scroll-right');
  let scrollAmount = 0;
  const scrollDistance = 220; // Distance to scroll (px)

  // Scroll left
  scrollLeftButton.addEventListener('click', () => {
    scrollAmount -= scrollDistance;
    if (scrollAmount < 0) scrollAmount = scrollingContainer.scrollWidth - scrollingContainer.offsetWidth; // Wrap around
    scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
  });

  // Scroll right
  scrollRightButton.addEventListener('click', () => {
    scrollAmount += scrollDistance;
    if (scrollAmount > scrollingContainer.scrollWidth - scrollingContainer.offsetWidth) {
      scrollAmount = 0; // Reset to the first card after the last card
    }
    scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
  });

  // Touch event for swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  scrollingContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  scrollingContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX) {
      scrollAmount += scrollDistance;
      if (scrollAmount > scrollingContainer.scrollWidth - scrollingContainer.offsetWidth) {
        scrollAmount = 0;
      }
      scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
    } else if (touchEndX > touchStartX) {
      scrollAmount -= scrollDistance;
      if (scrollAmount < 0) {
        scrollAmount = scrollingContainer.scrollWidth - scrollingContainer.offsetWidth;
      }
      scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
    }
  });
});