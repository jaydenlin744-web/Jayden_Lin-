
/**
 * TYPING ANIMATION
 * Animates text by typing it character-by-character
 * @param {Element} element - The DOM element to animate
 * @param {string} text - The text to type
 * @param {number} speed - Delay between characters in milliseconds (default: 50ms)
 */
function typeText(element, text, speed = 50) {
  element.textContent = '';
  let index = 0;
  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(type, speed);
      index++;
    }
  };
  type();
}

/**
 * CLOSE ZOOM MODAL
 * Helper function to close an image zoom modal
 * @param {string} checkboxId - The ID of the checkbox controlling the modal
 */
function closeZoomModal(checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  if (checkbox) checkbox.checked = false;
}

// ON PAGE LOAD - Initialize all animations and interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Get all text elements that need typing animation
  const headings = document.querySelectorAll('h1');
  const paragraphs = document.querySelectorAll('p, .description');
  
  // Animate headings with staggered delays (500ms apart)
  headings.forEach((el, i) => {
    setTimeout(() => typeText(el, el.textContent, 50), i * 500);
  });
  
  // Animate paragraphs after headings finish
  paragraphs.forEach((el, i) => {
    setTimeout(() => typeText(el, el.textContent, 30), (headings.length + i) * 500);
  });

  // Handle zoom modal close button (X) click
  document.querySelectorAll('.zoom-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeZoomModal(btn.getAttribute('for'));
    });
  });

  // Close modal when clicking the background (outside the image)
  document.querySelectorAll('.zoom-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        const closeBtn = modal.querySelector('.zoom-close');
        if (closeBtn) closeZoomModal(closeBtn.getAttribute('for'));
      }
    });
  });
});


