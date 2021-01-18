export const getTwoLastElementsHelper = (array: any[]) => {
    let latest_list = []
    const last = array[array.length - 1]
    latest_list.push(last)
    const penult = array[array.length - 2]
    penult && latest_list.push(penult)

    return latest_list
}