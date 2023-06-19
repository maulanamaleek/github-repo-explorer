import { QueryFunction, QueryKey } from "@tanstack/react-query";
import { E_Error, IRateLimitResp, IUserSearchResponse } from "../types";

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

const headers: HeadersInit = {
  'Authorization': import.meta.env.GITHUB_SECRET
}

export const getUserList: QueryFunction<IUserSearchResponse, QueryKey> = async ({ queryKey }) => {
  console.log('qkey', queryKey)
  const username = queryKey[1]
  if (!username) {
    return {};
  }
  const res = await fetch(`https://api.github.com/search/users?q=${username}&page=1&per_page=5`, {
    headers,
  })

  const data = await res.json();

  if (!data) {
    throw new Error(E_Error.FETCH_ERROR);
  }

  handleApiRateLimit(data, () => {
    throw new Error(E_Error.RATE_LIMIT)
  })

  return data
}

export const getRepo = async (url: string) => {
  const res = await fetch(url, {
    headers,
  });

  const data = await res.json();

  if (!data) {
    throw new Error(E_Error.FETCH_ERROR)
  }

  handleApiRateLimit(data, () => {
    throw new Error(E_Error.RATE_LIMIT)
  })
  return data;
}