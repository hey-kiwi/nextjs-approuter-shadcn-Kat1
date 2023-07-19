import { IOrganization } from './organization'
import { IResponse } from './response'

export interface IFusemetrix {
	id?: string
	username: string
	password: string
	payload?: any
	organization: IOrganization
}

export interface IFusemetrixAction {
	connect: (fusemetrix: IFusemetrix) => Promise<IResponse>
	disconnect: (organization: IOrganization) => Promise<IResponse>
}