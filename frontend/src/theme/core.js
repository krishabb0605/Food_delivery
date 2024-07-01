const breakpoints = {
  base: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px',
  '3xl': '1500px',
};

export const coreTheme = {
  breakpoints,
  colors: {
    camera: {
      blue: {
        light: '#1765b4',
        300: '#a1aebf',
      },
      text: '#7f8d97',
      border: {
        300: '#34445a',
      },
    },
  },
  fonts: {
    body: `'Inter', sans-serif`,
    heading: `'Inter', sans-serif`,
  },
};
