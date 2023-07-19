import { IResponse } from './response'

export interface IAccount {
	id?: string
	sub?: string
	name: string
	email: string
	phone: string
	avatar: string
	isVerified?: boolean
	isActive?: boolean
}

export interface IAccountAction {
	account: IAccount
	get: () => Promise<IResponse>
	update: (data: IAccount) => Promise<IResponse>
}