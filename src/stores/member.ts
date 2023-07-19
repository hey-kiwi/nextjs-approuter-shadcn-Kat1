import { create } from 'zustand'
import { IResponse } from '../interfaces/response'
import { IMember, IMemberAction } from '../interfaces/member'
import { IOrganization } from '../interfaces/organization'
import { organizationAction } from './organization'

const memberAction = create<IMemberAction>(() => ({
	invite: async (organization: IOrganization, member: IMember) => {
		const request = await fetch('/api/member/invite', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ organization, member })
		})

		if (request.status != 200) {
			return {
				ok: false,
				message: 'Something went wrong. Please try agian',
				data: []
			}
		}

		const response: IResponse = await request.json()

		return response
	},
	accept: async (data: IOrganization, member: IMember) => {
		const request = await fetch('/api/member/accept', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(member)
		})

		if (request.status != 200) {
			return {
				ok: false,
				message: 'Something went wrong. Please try again',
				data: []
			}
		}

		const response: IResponse = await request.json()

		if (response.ok) {
			organizationAction.setState({
				organizations: response.data
			})
		}

		return response
	},
	remove: async (data: IOrganization, member: IMember) => {
		const request = await fetch('/api/member/remove', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(member)
		})

		if (request.status != 200) {
			return {
				ok: false,
				message: 'Something went wrong. Please try again',
				data: []
			}
		}

		const response: IResponse = await request.json()

		if (response.ok) {
			organizationAction.setState({
				organizations: response.data
			})
		}

		return response
	}
}))

export { memberAction }