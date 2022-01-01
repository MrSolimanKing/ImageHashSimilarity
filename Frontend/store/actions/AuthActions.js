import { USERNAME, EMAIL, PASSWORD } from './AuthType'


export const setUserUsername = (data) => (
    {
        type: USERNAME,
        data: data,
    }
)


export const setUserEmail = (data) => (
    {
        type: EMAIL,
        data: data,
    }
)


export const setUserPassword = (data) => (
    {
        type: PASSWORD,
        data: data,
    }
)