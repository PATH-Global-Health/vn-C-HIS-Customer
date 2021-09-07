interface UserInfo {
  id: string,
  username: string,
  email: string,
  phoneNumber: string,
  fullName: string,
  isConfirmed: boolean,
}
interface Permissions {
  code: string
}
interface data {
  userInfo: UserInfo,
  permissions: Permissions
}
export interface AccountInfo {
  data: data,
}
