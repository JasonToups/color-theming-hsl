// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const hueSlider = document.getElementById('hue-slider');
  const saturationSlider = document.getElementById('saturation-slider');
  const lightnessSlider = document.getElementById('lightness-slider');

  const hueValue = document.getElementById('hue-value');
  const saturationValue = document.getElementById('saturation-value');
  const lightnessValue = document.getElementById('lightness-value');

  // Function to update CSS custom properties
  function updateCSSVariables() {
    const hue = hueSlider.value;
    const saturation = saturationSlider.value;
    const lightness = lightnessSlider.value;

    // Update CSS custom properties
    document.documentElement.style.setProperty('--base-hue', hue);
    document.documentElement.style.setProperty('--base-saturation', saturation + '%');
    document.documentElement.style.setProperty('--base-lightness', lightness + '%');

    // Update display values
    hueValue.textContent = hue;
    saturationValue.textContent = saturation;
    lightnessValue.textContent = lightness;
  }

  // Add event listeners to sliders
  hueSlider.addEventListener('input', updateCSSVariables);
  saturationSlider.addEventListener('input', updateCSSVariables);
  lightnessSlider.addEventListener('input', updateCSSVariables);

  // Initialize with current values
  updateCSSVariables();

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');

  function toggleTheme() {
    const isDark = themeToggle.checked;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('change', toggleTheme);

  // Initialize theme
  document.documentElement.setAttribute('data-theme', 'light');

  // Random button functionality
  const randomButton = document.getElementById('random-button');

  function randomizeColors() {
    // Generate random values
    const randomHue = Math.floor(Math.random() * 361); // 0-360
    const randomSaturation = Math.floor(Math.random() * 101); // 0-100
    const randomLightness = Math.floor(Math.random() * 101); // 0-100

    // Update slider values
    hueSlider.value = randomHue;
    saturationSlider.value = randomSaturation;
    lightnessSlider.value = randomLightness;

    // Update CSS variables and display values
    updateCSSVariables();
  }

  randomButton.addEventListener('click', randomizeColors);

  // Modal functionality - define all modal functions first
  const accentVarsButton = document.getElementById('accent-vars-button');
  const modalOverlay = document.getElementById('modal-overlay');
  const accentModal = document.getElementById('accent-modal');
  const closeModal = document.getElementById('close-modal');
  const copyAllButton = document.getElementById('copy-all');

  // Function to close modal
  function closeModalFunc() {
    modalOverlay.style.visibility = 'hidden';
    accentModal.style.visibility = 'hidden';
    modalOverlay.classList.remove('active');
    accentModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Function to fetch and parse CSS file
  async function fetchCSSVariables() {
    try {
      const response = await fetch('index.css');
      const cssText = await response.text();

      // Extract the section between the comments
      const startComment = '/*  responsive color values  */';
      const endComment = '/* end of color theme variables */';

      const startIndex = cssText.indexOf(startComment);
      const endIndex = cssText.indexOf(endComment) + endComment.length;

      if (startIndex !== -1 && endIndex !== -1) {
        const cssSection = cssText.substring(startIndex, endIndex);
        return cssSection;
      } else {
        console.error('CSS comments not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching CSS:', error);
      return null;
    }
  }

  // Function to update modal display
  async function updateModalDisplay() {
    const cssSection = await fetchCSSVariables();
    if (!cssSection) return;

    // Get current values from the sliders
    const currentHue = hueSlider.value;
    const currentSaturation = saturationSlider.value;
    const currentLightness = lightnessSlider.value;

    // Construct the complete CSS
    const cssCode = `/* Light Mode */
:root {
  /* adjust these three values to update all of the colors in the theme   */
  --base-hue: ${currentHue};
  --base-saturation: ${currentSaturation}%;
  --base-lightness: ${currentLightness}%;
  --base-color: hsl(var(--base-hue), var(--base-saturation), var(--base-lightness));
${cssSection}`;

    // Update the modal code block
    const codeElement = document.getElementById('dynamic-css-code');
    if (codeElement) {
      codeElement.textContent = cssCode;
    }
  }

  // Function to open modal
  async function openModal() {
    if (modalOverlay && accentModal) {
      await updateModalDisplay(); // This populates the code block

      modalOverlay.style.visibility = 'visible';
      accentModal.style.visibility = 'visible';
      modalOverlay.classList.add('active');
      accentModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Function to copy variables (copies what's in the code block)
  function copyVariables() {
    const codeElement = document.getElementById('dynamic-css-code');
    if (codeElement) {
      const cssText = codeElement.textContent;
      navigator.clipboard.writeText(cssText).then(() => {
        const originalText = copyAllButton.textContent;
        copyAllButton.textContent = 'Copied!';
        copyAllButton.style.backgroundColor = 'var(--color-warning)';

        setTimeout(() => {
          copyAllButton.textContent = originalText;
          copyAllButton.style.backgroundColor = '';
        }, 2000);
      });
    }
  }

  // Debug logging
  console.log('Modal elements found:', {
    accentVarsButton: accentVarsButton,
    modalOverlay: modalOverlay,
    accentModal: accentModal,
    closeModal: closeModal,
    copyAllButton: copyAllButton,
  });

  if (accentVarsButton) {
    accentVarsButton.addEventListener('click', openModal);
    console.log('Event listener attached to accent button');
  } else {
    console.error('accentVarsButton not found');
  }

  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModalFunc);
  }

  if (copyAllButton) {
    copyAllButton.addEventListener('click', copyVariables);
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && accentModal.classList.contains('active')) {
      closeModalFunc();
    }
  });
});
