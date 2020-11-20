export const profileLinks = [
    {name: 'MY PROFILE', path: '/settings/profile'},
    {name: 'COMPANY SETTINGS', path: '/settings/company'},
    {name: 'USER MANAGEMENT', path: '/settings/user/management'},
    {name: 'SETTINGS', path: '/settings/general'}
]

export const operationsLinks = [
    {name: 'ACTIVE', path: '/operations/active'},
    {name: 'COMPLETED', path: '/operations/completed'},
    {name: 'CANCELED', path: '/operations/canceled'},
]


export const ratesLinks = [
    {name: 'RATES', path: '/services/rates'},
    {name: 'SURCHARGES', path: '/services/surcharges'}
]

export const requestLinks = [
    {name:"BOOKING", path:"/requests/booking/"},
    {name:"QUOTES", path:"/quotes/"}
]

export type nestedLink = {
    name: string,
    path: string
}