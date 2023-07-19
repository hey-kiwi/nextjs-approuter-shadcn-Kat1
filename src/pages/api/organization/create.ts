import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const create = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)
	const sub: string = session.user.sub

	if (req.method != 'POST') {
		res.status(405).send({
			ok: false,
			message: 'Method not allowed',
			data: []
		})
	} else {
		try {
			const account = await prisma.account.findFirst({ where: { sub: sub } })

			if (account.id) {
				const organization = await prisma.organization.create({ data: req.body })

				if (organization.id) {
					const member = await prisma.member.create({
						data: {
							account: {
								connect: {
									email: account.email
								}
							},
							organization: {
								connect: {
									id: organization.id
								}
							},
							owner: true,
							accepted: true
						}
					})

					if (member) {
						res.status(200).send({
							ok: true,
							message: 'Organization created.',
							data: organization
						})
					} else {
						res.status(200).send({
							ok: false,
							message: 'Unable to connect organization with account. Please contact support.',
							data: []
						})
					}
				} else {
					res.status(200).send({
						ok: false,
						message: 'Unable to create organization. Please try again later or contact support.',
						data: []
					})
				}
			} else {
				res.status(200).send({
					ok: false,
					message: 'Account does not exist. Please try to login or contact support.',
					data: []
				})
			}
		} catch (e) {
			res.status(200).send({
				ok: false,
				message: 'Unable to create organization. Please try again later or contact support.',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(create)