import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-80874965-1');
};

export const logPageView = (pagePath = window.location.pathname) => {
  if (typeof window === 'undefined') {
    return;
  }

  ReactGA.set({ page: pagePath });
  ReactGA.pageview(pagePath);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
