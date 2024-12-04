export interface ISafeData {
    accessToken: string;
    name: string;
    roles: string[];
    paths: string[];
  }
  
  export interface IUserRoles {
    name: string;
    roles: string[];
  }
  
  export interface IRolePaths {
    role: string;
    paths: string[];
  }