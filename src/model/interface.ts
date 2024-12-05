export interface IUserData {
    name: string;
    pass: string;
    roles: string[];
    paths: string[];
}

export interface ISafeUserData extends IUserData {
    accessToken: string;
}
