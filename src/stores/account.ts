import { create } from 'zustand'
import { IAccount, IAccountAction } from '../interfaces/account'
import { IResponse } from '../interfaces/response'

const accountAction = create<IAccountAction>((set, get) => ({
	account: {
		id: '',
		sub: '',
		name: '',
		email: '',
		phone: '',
		avatar: ''
	},
	get: async () => {
		const request = await fetch('/api/account/get')

		if (request.status != 200) {
			return {
				ok: false,
				message: 'Something went wrong. Please try again.',
				data: []
			}
		}

		const response: IResponse = await request.json()

		if (response.ok) {
			set({
				account: response.data
			})
		}

		return response
	},
	update: async (data: IAccount) => {
		const request = await fetch('/api/account/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (request.status != 200) {
			return {
				ok: false,
				message: 'Something went wrong. Please try again.',
				data: []
			}
		}

		const response = await request.json()

		if (response.ok) {
			set({
				account: response.data
			})
		}

		return response
	}
}))

export { accountAction }