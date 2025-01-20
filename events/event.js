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

  // Scrolling functionality for infinite scroll
  const scrollingContainer = document.querySelector('.scrolling-container');
  const scrollLeftButton = document.querySelector('.scroll-left');
  const scrollRightButton = document.querySelector('.scroll-right');

  // Clone cards for infinite scrolling
  const cards = Array.from(scrollingContainer.children);
  cards.forEach(card => scrollingContainer.appendChild(card.cloneNode(true)));

  const cardWidth = cards[0].offsetWidth + 20; // Card width including margin
  const containerWidth = scrollingContainer.offsetWidth;
  let scrollAmount = 0;

  // Adjust the container width for cloning effect
  scrollingContainer.style.width = `${cards.length * 2 * cardWidth}px`;

  let autoScroll;

  // Scroll left function
  const scrollLeft = () => {
    scrollAmount -= cardWidth;
    if (scrollAmount < 0) {
      scrollAmount = scrollingContainer.scrollWidth / 2 - cardWidth;
      scrollingContainer.style.transition = 'none';
      scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
      setTimeout(() => scrollingContainer.style.transition = 'transform 0.5s ease-in-out', 50);
    } else {
      scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
    }
  };

  // Scroll right function
  const scrollRight = () => {
    scrollAmount += cardWidth;
    if (scrollAmount >= scrollingContainer.scrollWidth / 2) {
      scrollAmount = 0;
      scrollingContainer.style.transition = 'none';
      scrollingContainer.style.transform = `translateX(0px)`;
      setTimeout(() => scrollingContainer.style.transition = 'transform 0.5s ease-in-out', 50);
    } else {
      scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
    }
  };

  // Button event listeners
  scrollLeftButton.addEventListener('click', () => {
    clearInterval(autoScroll); // Stop auto-scroll
    scrollLeft();
    restartAutoScroll(); // Restart auto-scroll after a delay
  });

  scrollRightButton.addEventListener('click', () => {
    clearInterval(autoScroll); // Stop auto-scroll
    scrollRight();
    restartAutoScroll(); // Restart auto-scroll after a delay
  });

  // Touch event handling
  let touchStartX = 0;
  let touchEndX = 0;

  scrollingContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  scrollingContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX) {
      clearInterval(autoScroll); // Stop auto-scroll
      scrollRight();
      restartAutoScroll(); // Restart auto-scroll after a delay
    } else if (touchEndX > touchStartX) {
      clearInterval(autoScroll); // Stop auto-scroll
      scrollLeft();
      restartAutoScroll(); // Restart auto-scroll after a delay
    }
  });

  // Auto-scroll functionality (changed interval to 1500ms for faster scrolling)
  const startAutoScroll = () => {
    // Clear any existing interval before starting a new one
    clearInterval(autoScroll);
    autoScroll = setInterval(scrollRight, 1500); // Set to 1500ms (1.5 seconds)
  };

  const restartAutoScroll = () => {
    setTimeout(startAutoScroll, 5000); // Restart auto-scroll after 5 seconds
  };

  startAutoScroll(); // Initialize auto-scroll

  scrollingContainer.addEventListener('mouseenter', () => clearInterval(autoScroll));
  scrollingContainer.addEventListener('mouseleave', () => {
    startAutoScroll();
  });

  // Adjust layout on window resize
  window.addEventListener('resize', () => {
    scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
  });

  // Function to scroll the container to center the clicked card
  const centerCard = (cardIndex) => {
    // Center the card on screen
    scrollAmount = cardIndex * cardWidth - (containerWidth / 2) + (cardWidth / 2);
    scrollingContainer.style.transition = 'transform 0.5s ease-in-out';
    scrollingContainer.style.transform = `translateX(-${scrollAmount}px)`;
  };

});
