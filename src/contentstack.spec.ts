/**
 * @copyright Copyright 2023, BISSELL Homecare, Inc.
 * All Rights Reserved.
 *
 * This is UNPUBLISHED PROPRIETARY SOURCE CODE of BISSELL Homecare, Inc.
 * the contents of this file may not be disclosed to third parties, copied
 * or duplicated in any form, in whole or in part, without the prior
 * written permission of BISSELL Homecare, Inc.
 */

import "reflect-metadata";
import { Contentstack } from "./contentstack";
import nock from "nock";

jest.setTimeout(10000);

let csClient: Contentstack;

describe("Contentstack", () => {
  describe("Unit Tests", () => {
    beforeEach(() => {
      csClient = new Contentstack("apiKey", "mgmtToken");
    });
    it("should fail after too many retries", async () => {
      nock("https://api.contentstack.io/v3", {
        reqheaders: {
          api_key: "apiKey",
          authorization: "mgmtToken",
        },
      })
        .get("/locales")
        .reply(429)
        .get("/locales")
        .reply(429)
        .get("/locales")
        .reply(429)
        .get("/locales")
        .reply(429)
        .get("/locales")
        .reply(429)
        .get("/locales")
        .reply(200, []);
      const token = "time to get locales: ";
      console.time(token);
      await expect(csClient.getLocales()).rejects.toThrow();
      console.timeEnd(token);
    });
  });
});
