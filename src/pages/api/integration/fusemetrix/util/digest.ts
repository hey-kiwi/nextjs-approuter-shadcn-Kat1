import crypto from 'crypto'

const create = async (token: string, password: string) => {
  return crypto
    .createHash('md5')
    .update(password + token)
    .digest('hex')
}

const digest = {
  create
}

export default digest