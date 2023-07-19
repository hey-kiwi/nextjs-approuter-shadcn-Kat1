import { create } from 'zustand'
import { IDevice, IDeviceAction } from '../interfaces/device'
import { IResponse } from '../interfaces/response'
import { IOrganization } from '../interfaces/organization'

const deviceAction = create<IDeviceAction>((set, get) => ({
	devices: [],
	list: async (organization: IOrganization) => {
		const request = await fetch('/api/device/list', {
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
			const devices: IDevice[] = response.data
			set({
				devices: devices
			})
		}

		return response
	},
	get: async (organization: IOrganization, device: IDevice) => {
		const request = await fetch('/api/device/get', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ organization, device })
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
	create: async (organization: IOrganization, device: IDevice) => {
		const request = await fetch('/api/device/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ organization, device })
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
			const devices: IDevice[] = response.data
			set({
				devices: devices
			})
		}

		return response
	},
	update: async (organization: IOrganization, device: IDevice) => {
		const request = await fetch('/api/device/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ organization, device })
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
			const devices: IDevice[] = response.data
			set({
				devices: devices
			})
		}

		return response
	},
	delete: async (organization: IOrganization, device: IDevice) => {
		const request = await fetch('/api/device/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ organization, device })
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
			const devices: IDevice[] = response.data
			set({
				devices: devices
			})
		}

		return response
	}
}))

export { deviceAction }