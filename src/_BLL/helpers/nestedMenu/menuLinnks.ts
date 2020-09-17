export const profileLinks = [
    {name: 'MY PROFILE', path: '/profile'},
    {name: 'COMPANY SETTINGS', path: '/company/settings'},
    {name: 'USER MANAGEMENT', path: '/management'},
    {name: 'SETTINGS', path: '/settings'}
]

export const operationsLinks = [
    {name: 'ACTIVE', path: '/operations/active'},
    {name: 'COMPLETED', path: '/operations/completed'},
    {name: 'CANCELED', path: '/operations/canceled'},
]

export type nestedLink = {
    name: string,
    path: string
}