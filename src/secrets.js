import 'process'

// some secrets
const SECRETS = {
    ANTO_BACKEND_SERVER_API: process.env.REACT_APP_ANTO_BACKEND_SERVER_API,
    ANTO_DEV_BACKEND_SERVER_API: process.env.REACT_APP_ANTO_DEV_BACKEND_SERVER_API,
    ANTO_BACKEND_SERVER_PASSKEY: process.env.REACT_APP_ANTO_BACKEND_SERVER_PASSKEY
}

console.log(process)
console.log(SECRETS)

export default SECRETS;