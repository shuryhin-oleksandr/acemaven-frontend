export const getColor = (array: any) => {
    if(!array) return ''
    else if(array.length > 1) {
        return ''
    }
    switch(array && array[0]) {
        case 'master': {
            return '#000000'
            break
        }

        case 'agent' : {
            return '#115B86'
            break
        }

        case 'billing' : {
            return '#1AB8E6'
            break
        }
        default: return ''
    }
}