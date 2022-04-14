const dev_env = {}

const prod_env = {}

const config = process.env.REACT_APP_ENV === "dev" ? dev_env : prod_env

export default config

