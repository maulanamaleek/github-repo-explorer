
export interface IRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string;
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