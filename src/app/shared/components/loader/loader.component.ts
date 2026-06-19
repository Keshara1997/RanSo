/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mifosx-loader',
  template: `
    <div class="mifosx-loader-container">
      <div class="ranso-loader" role="status" aria-label="Loading">
        <img src="assets/images/ranso-icon.svg" alt="" class="ranso-loader-icon" />
      </div>
    </div>
  `,
  styles: [
    `
      .mifosx-loader-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: #0f172a;
      }

      .ranso-loader {
        display: flex;
        justify-content: center;
        align-items: center;
        animation: ranso-pulse 1.6s ease-in-out infinite;
      }

      .ranso-loader-icon {
        width: 72px;
        height: 72px;
      }

      @keyframes ranso-pulse {
        0%,
        100% {
          opacity: 0.6;
          transform: scale(0.92);
        }

        50% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {}
