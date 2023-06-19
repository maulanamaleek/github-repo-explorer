import { E_Error } from "../types"

export const QUERY_KEY = {
  GITHUB_USER: 'github_user',
  GITHUB_REPO: 'github_repo'
}

export const ERROR_MESSAGES: Record<E_Error, string> = {
  RATE_LIMIT: 'Your request is being rate-limited from github api, please try again in a few minutes',
  FETCH_ERROR: 'There is something wrong when fetching your request',
  DEFAULT: 'There is someting wrong'
}

// time in miliseconds
export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;

export const isDev = /(127.0.0.1|localhost)/.test(location.origin);