'use client';
import * as React from 'react';
import { platform } from '@base-ui/utils/platform';

/**
 * Show the platform-specific search shortcut without assuming an OS during SSR.
 */
export function SearchShortcut() {
  const isMac = React.useSyncExternalStore<boolean | null>(
    () => () => {},
    () => platform.os.mac,
    () => null,
  );

  return (
    <span className="SearchTriggerShortcut">
      <span className="SearchTriggerShortcutLabel">
        {isMac !== null && (
          <React.Fragment>
            ({isMac ? <kbd>⌘</kbd> : <kbd>Ctrl+</kbd>}
            <kbd>k</kbd>)
          </React.Fragment>
        )}
      </span>
    </span>
  );
}
