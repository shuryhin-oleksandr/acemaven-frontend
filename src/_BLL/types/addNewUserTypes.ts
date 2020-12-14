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
    first_name?: string,
    last_name?: string,
    email?: string,
    roles?: string[],
    phone?: string,
    position?: string,
    password?: string,
   confirm_password?: string,
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
    bank_number?: string | number,
    branch?: string,
    number?: number | string,
    is_default?: boolean
}
