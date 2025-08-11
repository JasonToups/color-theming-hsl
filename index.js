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

  // Modal functionality
  const accentVarsButton = document.getElementById('accent-vars-button');
  const modalOverlay = document.getElementById('modal-overlay');
  const accentModal = document.getElementById('accent-modal');
  const closeModal = document.getElementById('close-modal');
  const copyAllButton = document.getElementById('copy-all');

  // Debug logging
  console.log('Modal elements found:', {
    accentVarsButton: accentVarsButton,
    modalOverlay: modalOverlay,
    accentModal: accentModal,
    closeModal: closeModal,
    copyAllButton: copyAllButton
  });

  function openModal() {
    console.log('openModal called');
    console.log('modalOverlay:', modalOverlay);
    console.log('accentModal:', accentModal);
    
    if (modalOverlay && accentModal) {
      modalOverlay.classList.add('active');
      accentModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      console.log('Modal opened successfully');
    } else {
      console.error('Modal elements not found');
    }
  }

  function closeModalFunc() {
    modalOverlay.classList.remove('active');
    accentModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function copyVariables() {
    const lightModeVars = `/* Light Mode Accent Colors */
--color-accent: hsl(from var(--base-color) calc(h + 220) s l);
--color-accent-light: hsl(from var(--base-color) calc(h + 220) s calc(l + 20));
--color-accent-dark: hsl(from var(--base-color) calc(h + 220) s calc(l - 20));`;

    const darkModeVars = `/* Dark Mode Accent Colors */
--color-accent: hsl(from var(--base-color) calc(h + 220) s l);
--color-accent-light: hsl(from var(--base-color) calc(h + 220) s calc(l + 20));
--color-accent-dark: hsl(from var(--base-color) calc(h + 220) s calc(l - 20));`;

    const allVars = `${lightModeVars}

${darkModeVars}`;

    navigator.clipboard.writeText(allVars).then(() => {
      const originalText = copyAllButton.textContent;
      copyAllButton.textContent = 'Copied!';
      copyAllButton.style.background-color = 'var(--color-warning)';
      
      setTimeout(() => {
        copyAllButton.textContent = originalText;
        copyAllButton.style.backgroundColor = '';
      }, 2000);
    });
  }

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
