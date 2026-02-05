import ReactGA from 'react-ga';

export function initGA(): void {
  ReactGA.initialize('UA-80874965-1');
}

export function logPageView(pagePath: string = window.location.pathname): void {
  if (typeof window === 'undefined') {
    return;
  }

  ReactGA.set({ page: pagePath });
  ReactGA.pageview(pagePath);
}

export function logEvent(category = '', action = ''): void {
  if (category && action) {
    ReactGA.event({ category, action });
  }
}

export function logException(description = '', fatal = false): void {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}
