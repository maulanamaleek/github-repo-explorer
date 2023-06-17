
export interface IRepo {
  description: string | null;
  full_name: string;
  html_url: string;
  id: number;
  name: string;
  private: boolean;
  stargazers_count: number;
}

export interface IUser {
  id: number;
  login: string;
  repos_url: string;
}

export interface IUserSearchResponse {
  total_counts: number;
  incomplete_result: boolean;
  items: IUser[];
}

export interface IRateLimitResp {
  message: string;
  documentation_url: string;
}

export enum EError {
  FETCH_ERROR = 'FETCH_ERROR',
  RATE_LIMIT = 'RATE_LIMIT',
  DEFAULT = 'DEFAULT'
}