import { create } from 'zustand'
import { IVcloud, IVcloudAction } from '../interfaces/vcloud'
import { IOrganization } from '../interfaces/organization'
import { IResponse } from '../interfaces/response'
import { organizationAction } from './organization'

const vcloudAction = create<IVcloudAction>(() => ({
	connect: async (vcloud: IVcloud) => {
		const request = await fetch('/api/integration/vcloud/connect', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(vcloud)
		})

		if (request.status != 200) {
			return {
				ok: false,
				message: 'Something went wrong. Please try again.',
				data: []
			}
		}

		const response: IResponse = await request.json()

		if (response.ok) {
			const organizations: IOrganization[] = response.data

			organizationAction.setState({
				organizations: organizations
			})
		}

		return response
	},
	disconnect: async (organization: IOrganization) => {
		const request = await fetch('/api/integration/vcloud/disconnect', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ organization })
		})

		if (request.status != 200) {
			return {
				ok: false,
				message: 'Something went wrong. Please try again.',
				data: []
			}
		}

		const response: IResponse = await request.json()

		if (response.ok) {
			const organizations: IOrganization[] = response.data

			organizationAction.setState({
				organizations: organizations
			})
		}

		return response
	}
}))

export { vcloudAction }