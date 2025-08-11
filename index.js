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
});
