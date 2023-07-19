import { IResponse } from './response'
import { IAccount } from './account'
import { IFusemetrix } from './fusemetrix'
import { IVcloud } from './vcloud'

export interface IOrganization {
	id?: string
	name: string
	email: string
	phone: string
	location: string
	logo?: string
	accounts?: IAccounts[]
	fusemetrix?: IFusemetrix
	vcloud?: IVcloud
}

export interface IAccounts {
	owner: boolean,
	accepted: boolean,
	accountEmail: string,
	organizationId: string,
	assignedOn: Date,
	account?: IAccount
}


export interface IOrganizationAction {
	active: IOrganization
	organizations: IOrganization[]
	list: () => Promise<IResponse>
	get: (data: IOrganization) => Promise<IResponse>
	create: (data: IOrganization) => Promise<IResponse>
	update: (data: IOrganization) => Promise<IResponse>
	delete: (data: IOrganization) => Promise<IResponse>
}