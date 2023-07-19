import { customAlphabet } from 'nanoid'

const generate = async () => {
	const nanoid = await customAlphabet('1234567890abcdef', 10)
	return nanoid()
}

export { generate }