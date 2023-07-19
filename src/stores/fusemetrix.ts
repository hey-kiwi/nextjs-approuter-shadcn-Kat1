import { create } from 'zustand'
import { IFusemetrix, IFusemetrixAction } from '../interfaces/fusemetrix'
import { IOrganization } from '../interfaces/organization'
import { IResponse } from '../interfaces/response'
import { organizationAction } from './organization'

const fusemetrixAction = create<IFusemetrixAction>(() => ({
	connect: async (fuseMetrix: IFusemetrix) => {
		const request = await fetch('/api/integration/fusemetrix/connect', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(fuseMetrix)
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
		const request = await fetch('/api/integration/fusemetrix/disconnect', {
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

export { fusemetrixAction }