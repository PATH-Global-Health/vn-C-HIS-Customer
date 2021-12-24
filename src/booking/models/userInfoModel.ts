export interface UserInfo {
    data: {
        id: string,
        username: string,
        email: string,
        phoneNumber: string,
        fullName: string,
    },
    errorMessage: null,
    succeed: boolean,
}