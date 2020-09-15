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

export interface IBankAccountData {
    taxId?: string,
    name?: string,
    branchNumber?: string,
    accountNumber?: string
}