export type EditCompanyInfo = {
    city: string,
    state: string,
    zipCode: string,
    address1: string,
    address2?:string,
    phoneNumber: string,
    email: string
}

export type AddNewBankAccount = {
    tax: string,
    bankName: string,
    branchNumber: string,
    accountNumber: string,
    accountType: string
}

export type EditUserInfo = {
    name: string,
    lastName: string,
    roles: string[],
    email: string,
    photo?: string
}