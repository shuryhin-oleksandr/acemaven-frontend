export const profileLinks = [
    {name: 'MY PROFILE', path: '/settings/profile'},
    {name: 'COMPANY SETTINGS', path: '/settings/company'},
    {name: 'USER MANAGEMENT', path: '/settings/user/management'},
    {name: 'SETTINGS', path: '/settings/general'}
]

export const operationsLinks = [
    {name: 'ACTIVE', path: '/operations_active'},
    {name: 'COMPLETED', path: '/operations_completed'},
    {name: 'CANCELED', path: '/operations_cancelled'},
]

export const billingLinks = [
    {name: 'EXCHANGE RATE', path: '/billing_exchange'},
    {name: 'BILLING IN PROGRESS', path: '/billing_in_progress'},
    {name: 'COMPLETED', path: '/billing_completed'}
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