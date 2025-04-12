module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'campus-blue': '#2563eb',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
module.exports = {
  theme: {
    extend: {
      colors: {
        'nav-blue': '#2563eb',
        'nav-indigo': '#4338ca',
      },
    },
  },
}
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    // Add other paths to your template files here
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, etc. here
    },
  },
  plugins: [],
};
