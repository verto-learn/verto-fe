export const getUserStats = async () => {
    const response = await axiosInstance.get(`${ENDPOINT.USER_STATS}`)
    return response
}