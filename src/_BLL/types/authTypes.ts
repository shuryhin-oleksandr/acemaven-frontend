//sign up steps data types

export interface IFirstPart {
    type: string,
    name: string,
    phone: string,
    master_email: string,
    employees_number?: number,
    website?: string
}

export interface ISecondPart {
    address_line_first?: string,
    address_line_second?: string,
    state: string,
    city: string,
    zip_code: string,
    tax_id: string
}


//whole data types from forms for API requests
export interface ILoginData {
    email: string,
    password: string
}

export interface ICompanySignUpData {
    type: string,
    name: string,
    address_line_first?: string,
    address_line_second?: string,
    state: string,
    city: string,
    zip_code: string,
    phone: string,
    tax_id: string,
    employees_number?: number,
    website?: string,
    master_email: string
}
export interface ICompanySignUpError {
    master_email?: string[],
    phone?: string[]
}

export interface IMasterAccountData {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    position: string,
    password: string,
    confirm_password: string,
    photo?: string
}