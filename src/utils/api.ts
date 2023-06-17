import { IRateLimitResp } from "../types";


/**
 * NOTE:
 * github api got requests rate limiter
 * this function will check if the response is rate limit and handle it
 */
export const handleApiRateLimit = <T extends object>(
  resp: T | IRateLimitResp,
  cb: () => void
) => {
  if (resp.hasOwnProperty('message')) {
    return cb();
  }
}
