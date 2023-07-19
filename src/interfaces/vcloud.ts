import { IOrganization } from './organization'
import { IResponse } from './response'

export interface IVcloud {
	id?: string
	apiKey: string
	serviceName: string
	merchantId?: string
	merchantName: string
	payload?: any
	organization?: IOrganization
}

export interface IVcloudAction {
	connect: (vcloud: IVcloud) => Promise<IResponse>
	disconnect: (organization: IOrganization) => Promise<IResponse>
}