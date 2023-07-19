import { IResponse } from './response'
import { IOrganization } from './organization'

export interface IDevice {
	id?: string
	key?: string
	name: string
	location: string
	canBook?: boolean
	canCheckin?: boolean
	onMaintenance?: boolean
	bookingIntegration?: any
	paymentIntegration?: any
	acceptStripe?: boolean
	isActive?: boolean
	organizationId?: number
	organizationName?: string
}

export interface IDeviceAction {
	devices: IDevice[]
	list: (organization: IOrganization) => Promise<IResponse>
	get: (organization: IOrganization, device: IDevice) => Promise<IResponse>
	create: (organization: IOrganization, device: IDevice) => Promise<IResponse>
	update: (organization: IOrganization, device: IDevice) => Promise<IResponse>
	delete: (organization: IOrganization, device: IDevice) => Promise<IResponse>
}