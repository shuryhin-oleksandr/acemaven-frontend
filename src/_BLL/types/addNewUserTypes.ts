//data from form
export interface IAddNewUserData {
    name?: string,
    lastName?: string,
    email: string,
    companyPosition?: string,
    userRole: string
}

export interface IAdditionalUser {
    fullName: string,
    email: string,
    roles: string[]
}

//FORM FOR ADDITIONAL USER
export interface IAdditionalUserCompleteData {
    name: string,
    lastName: string,
    email: string,
    roles: string[],
    phoneNumber: string,
    companyPosition: string,
    password?: string,
    repeatPassword?: string,
    photo?: string
}


export interface IBankAccountData {
    taxId?: string,
    name?: string,
    branchNumber?: string,
    accountNumber?: string
}

//data from form
export interface IAddNewBank {
    accountType?: string,
    name?: string,
    branchNumber?: string,
    accountNumber?: string
}
