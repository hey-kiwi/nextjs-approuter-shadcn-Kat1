import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const accept = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)
	const email: string = session.user.email

	if (req.method != 'POST') {
		res.status(405).send({
			ok: false,
			message: 'Method not allowed',
			data: []
		})
	} else {
		try {
			const member = await prisma.member.delete({
				where: {
					accountEmail_organizationId: {
						accountEmail: req.body.accountEmail,
						organizationId: req.body.organizationId
					}
				}
			})

			if (member) {
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
						}
					}
				})

				if (organizations && organizations.length > 0) {
					res.status(200).send({
						ok: true,
						message: 'Member removed',
						data: organizations
					})
				} else {
					res.status(200).send({
						ok: false,
						message: 'Something went wrong. Please try to refresh',
						data: []
					})
				}
			} else {
				res.status(200).send({
					ok: false,
					message: 'Unable to remove member. Please try again later',
					data: []
				})
			}
		} catch (e) {
			console.log(e)
			res.status(200).send({
				ok: false,
				message: 'Unable to remove member. Please try again later or contact support',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(accept)