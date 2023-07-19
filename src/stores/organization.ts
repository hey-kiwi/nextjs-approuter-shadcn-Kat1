import { create } from 'zustand'
import { IOrganization, IOrganizationAction } from '../interfaces/organization'
import { IResponse } from '../interfaces/response'

const organizationAction = create<IOrganizationAction>((set, get) => ({
	active: {
		id: '',
		name: '',
		email: '',
		phone: '',
		location: '',
		logo: '',
		accounts: null
	},
	organizations: [],
	list: async () => {
		const request = await fetch('/api/organization/list')

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
			set({
				organizations: organizations
			})
			
			if (get().active?.id == '') {
				set({
					active: {...get().organizations[0]}
				})
			}
		}
		
		return response
	},
	get: async (organization: IOrganization) => {
		const request = await fetch('/api/organization/get', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(organization)
		})

		if (request.status != 200) {
			return {
				ok: false,
				message: 'Something went wrong. Please try again.',
				data: []
			}
		}

		const response: IResponse = await request.json()

		return response
	},
	create: async (organization: IOrganization) => {
		const request = await fetch('/api/organization/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(organization)
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
			const organization: IOrganization = response.data
			set({
				active: organization,
				organizations: [...get().organizations, organization]
			})
		}

		return response
	},
	update: async (organization: IOrganization) => {
		const request = await fetch('/api/organization/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(organization)
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
			set({
				organizations: [...organizations]
			})
		}

		return response
	},
	delete: async (organization: IOrganization) => {
		const request = await fetch('/api/organization/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(organization)
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
			set({
				organizations: [...get().organizations?.filter((org: IOrganization) => org.id != organization.id)]
			})
		}

		return response
	}
}))

export { organizationAction }