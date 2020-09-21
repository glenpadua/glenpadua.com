import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@uncommonui/core';
import { addDecorator } from '@storybook/react';
import '../pages/index.css';

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
