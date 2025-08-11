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
    copyAllButton: copyAllButton,
  });

  function openModal() {
    console.log('openModal called');
    console.log('modalOverlay:', modalOverlay);
    console.log('accentModal:', accentModal);

    if (modalOverlay && accentModal) {
      // Update modal display with current slider values
      document.getElementById('modal-hue').textContent = hueSlider.value;
      document.getElementById('modal-saturation').textContent = saturationSlider.value;
      document.getElementById('modal-lightness').textContent = lightnessSlider.value;

      modalOverlay.style.visibility = 'visible';
      accentModal.style.visibility = 'visible';
      modalOverlay.classList.add('active');
      accentModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      console.log('Modal opened successfully');
    } else {
      console.error('Modal elements not found');
    }
  }

  function closeModalFunc() {
    modalOverlay.style.visibility = 'hidden';
    accentModal.style.visibility = 'hidden';
    modalOverlay.classList.remove('active');
    accentModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function copyVariables() {
    // Get current values from the sliders
    const currentHue = hueSlider.value;
    const currentSaturation = saturationSlider.value;
    const currentLightness = lightnessSlider.value;

    const allVars = `/* Light Mode */
:root {
  --base-hue: ${currentHue};
  --base-saturation: ${currentSaturation}%;
  --base-lightness: ${currentLightness}%;
  --base-color: hsl(var(--base-hue), var(--base-saturation), var(--base-lightness));
  
  --color-bg-low: hsl(from var(--base-color) h s 90);
  --color-bg-mid: hsl(from var(--base-color) h s 95);
  --color-bg-high: hsl(from var(--base-color) h s 98);
  --color-border: hsl(from var(--base-color) h s 70);
  --color-text-light: hsl(from var(--base-color) h s 15);
  --color-text-dark: hsl(from var(--base-color) h s 5);
  --color-primary-dark: hsl(from var(--base-color) h s calc(l - 20));
  --color-primary-light: hsl(from var(--base-color) h s calc(l + 20));
  --color-accent: hsl(from var(--base-color) calc(h + 220) s l);
  --color-warning: hsl(from var(--base-color) 340 calc(s + 20) 50);
  --color-cancel: hsl(from var(--base-color) h s 85%);
}

/* Dark Mode */
[data-theme='dark'] {
  --color-bg-low: hsl(from var(--base-color) h s 5);
  --color-bg-mid: hsl(from var(--base-color) h s 10);
  --color-bg-high: hsl(from var(--base-color) h s 15);
  --color-border: hsl(from var(--base-color) h s 20);
  --color-text-light: hsl(from var(--base-color) h s 80);
  --color-text-dark: hsl(from var(--base-color) h s 90);
  --color-primary-dark: hsl(from var(--base-color) h s calc(l + 20));
  --color-primary-light: hsl(from var(--base-color) h s calc(l - 20));
  --color-accent: hsl(from var(--base-color) calc(h + 220) s l);
  --color-warning: hsl(from var(--base-color) 340 calc(s - 30) 50);
  --color-cancel: hsl(from var(--base-color) h s calc(l - 20));
}`;

    navigator.clipboard.writeText(allVars).then(() => {
      const originalText = copyAllButton.textContent;
      copyAllButton.textContent = 'Copied!';
      copyAllButton.style.backgroundColor = 'var(--color-warning)';

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
