import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const create = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)
	const sub: string = session.user.sub
	const email: string = session.user.email

	if (req.method != 'GET') {
		res.status(405).send({
			ok: false,
			message: 'Method not allowed',
			data: []
		})
	} else {
		try {
			const organizations = await prisma.organization.findMany({
				where: {
					accounts: {
						some: {
							account: {
								email: email
							}
						}
					}
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

			if (organizations && organizations.length > 0) {
				res.status(200).send({
					ok: true,
					message: 'Organizations found.',
					data: organizations
				})
			} else {
				res.status(200).send({
					ok: false,
					message: 'Organizations not found. Please create one or request to be added to one.',
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

export default withApiAuthRequired(create)