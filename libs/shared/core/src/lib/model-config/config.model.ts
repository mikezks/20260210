export interface UserInfo {
  username: string;
  firstname: string;
  lastname: string;
}

export interface ConfigState {
  userInfo: UserInfo;
  apiUrl: string;
}

export const initialConfigState: ConfigState = {
  userInfo: {
    username: '',
    firstname: '',
    lastname: ''
  },
  apiUrl: ''
};
