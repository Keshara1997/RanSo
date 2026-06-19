/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { ApplicationRef, Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  private ref = inject(ApplicationRef);

  private darkModeOn = true;

  themes = ['dark-theme', 'light-theme'];
  theme = new BehaviorSubject('dark-theme');

  constructor() {
    document.body.classList.add('dark-theme');
    this.setDarkMode(this.readStoredDarkModePreference());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      this.ref.tick();
    });
  }

  private readStoredDarkModePreference(): boolean {
    const stored = localStorage.getItem('mifosXThemeDarkEnabled');
    if (stored === null) {
      return true;
    }
    return JSON.parse(stored);
  }

  isDarkMode(): boolean {
    return this.darkModeOn;
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkModeOn = isDarkMode;
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      this.theme.next('dark-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      this.theme.next('light-theme');
    }
  }

  setInitialDarkMode(): void {
    this.setDarkMode(this.readStoredDarkModePreference());
  }
}
