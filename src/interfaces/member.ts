import { IResponse } from './response'
import { IAccounts, IOrganization } from './organization'

export interface IMember {
	owner?: boolean
	accepted?: boolean
	accountEmail?: string
	organizationId?: string
}

export interface IMemberAction {
	invite: (data: IOrganization, member: IMember) => Promise<IResponse>
	accept: (data: IOrganization, member: IMember) => Promise<IResponse>
	remove: (data: IOrganization, member: IMember) => Promise<IResponse>
}