/**
 * @copyright Copyright 2023, BISSELL Homecare, Inc.
 * All Rights Reserved.
 *
 * This is UNPUBLISHED PROPRIETARY SOURCE CODE of BISSELL Homecare, Inc.
 * the contents of this file may not be disclosed to third parties, copied
 * or duplicated in any form, in whole or in part, without the prior
 * written permission of BISSELL Homecare, Inc.
 */

import * as contentstack from "@contentstack/management";
import { Stack } from "@contentstack/management/types/stack";
import { Locale } from "@contentstack/management/types/stack/locale";

export class Contentstack {
  private client;
  private stack: Stack;
  private SEC_TO_MS = 1000;

  constructor(apiKey: string, managementToken: string) {
    this.client = contentstack.client({
      retryLimit: 4,
      timeout: 60 * this.SEC_TO_MS,
      /**
       * 5 second retry logic
       */
      retryDelayOptions: {
        customBackoff: (_retryCount, _error) =>
          5 * this.SEC_TO_MS,
      },
    });

    this.stack = this.client.stack({
      api_key: apiKey,
      management_token: managementToken,
    });
  }

  public async getLocales(): Promise<Locale[]> {
    const locales = await this.stack.locale().query().find();
    return locales.items;
  }
}
