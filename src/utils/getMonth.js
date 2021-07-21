export const getMonth = () => {
    const date = new Date()
    const month = date.getMonth() <10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    return month
}