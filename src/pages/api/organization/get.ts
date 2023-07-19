import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
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
			if (req.body.id) {
				const organization = await prisma.organization.findFirst({
					where: {
						id: req.body.id
					},
					include: {
						accounts: {
							include: {
								account: {
									select: {
										name: true,
										email: true,
										phone: true,
										avatar: true
									}
								}
							}
						},
						fusemetrix: {
							select: {
								id: true,
								username: true
							}
						},
						vcloud: {
							select: {
								id: true,
								serviceName: true,
								merchantName: true
							}
						}
					}
				})

				if (organization) {
					res.status(200).send({
						ok: true,
						message: 'Organization found.',
						data: organization
					})
				} else {
					res.status(200).send({
						ok: false,
						message: 'Organization not found. Please create one or request to be added to one.',
						data: []
					})
				}
			} else {
				res.status(200).send({
					ok: false,
					message: 'Organization identifier not found. Please try again.',
					data: []
				})
			}
		} catch (e) {
			res.status(200).send({
				ok: false,
				message: 'Unable to get organizations. Please try again later or contact support.',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(get)