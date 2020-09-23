//data from form
export interface IAddNewUserData {
    first_name?: string,
    last_name?: string,
    email: string,
    id?: number,
    phone?: string,
    photo?: string,
    position?: string,
    roles: string[],
    companies?: any
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
    id?: number,
    account_type?: string,
    bank_name?: string,
    branch?: string,
    number?: number,
    is_default?: boolean
}
