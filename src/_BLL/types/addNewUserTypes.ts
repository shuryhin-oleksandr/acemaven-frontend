export interface IAddNewUserData {
    name: string,
    lastName: string,
    email: string,
    companyPosition?: string,
    userRole: string
}

export interface IAdditionalUser {
    fullName: string,
    email: string,
    roles: string[]
}