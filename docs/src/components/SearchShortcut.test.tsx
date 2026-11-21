// @vitest-environment jsdom
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { createRenderer } from '@mui/internal-test-utils';
import { expect, it, vi } from 'vitest';
import { SearchShortcut } from './SearchShortcut';

const testPlatform = vi.hoisted(() => ({ mac: false }));

vi.mock('@base-ui/utils/platform', () => ({
  platform: {
    os: {
      get mac() {
        return testPlatform.mac;
      },
    },
  },
}));

const { render } = createRenderer();

it('does not assume a platform in the server-rendered search shortcut', () => {
  const html = ReactDOM.renderToStaticMarkup(<SearchShortcut />);

  expect(html).toContain('SearchTriggerShortcutLabel');
  expect(html).not.toContain('⌘');
  expect(html).not.toContain('Ctrl+');
});

it.each([
  { os: 'Windows', mac: false, shortcut: '(Ctrl+k)' },
  { os: 'macOS', mac: true, shortcut: '(⌘k)' },
])('shows $shortcut in the browser on $os', async ({ mac, shortcut }) => {
  testPlatform.mac = mac;
  const { container } = await render(<SearchShortcut />);
  const label = container.querySelector('.SearchTriggerShortcutLabel');

  expect(label?.textContent).toBe(shortcut);
});
