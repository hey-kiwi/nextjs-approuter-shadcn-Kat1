import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const create = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)
	const sub: string = session.user.sub
	const email: string = session.user.email

	if (req.method != 'POST') {
		res.status(405).send({
			ok: false,
			message: 'Method not allowed',
			data: []
		})
	} else {
		try {
			const member = await prisma.member.findFirst({
				where: {
					account: {
						email: email
					},
					organizationId: req.body.id,
					owner: true
				}
			})

			if (member) {
				const organization = await prisma.organization.delete({
					where: {
						id: req.body.id
					}
				})

				if (organization) {
					const organizations = await prisma.organization.findMany({
						where: {
							accounts: {
								some: {
									account: {
										email: email
									}
								}
							}
						}
					})
					
					res.status(200).send({
						ok: true,
						message: 'Organization deleted.',
						data: organizations
					})
				} else {
					res.status(200).send({
						ok: false,
						message: 'Unable to delete organization. Please contact support.',
						data: []
					})
				}
			} else {
				res.status(200).send({
					ok: false,
					message: 'You do not have permission to delete this organization.',
					data: []
				})
			}
		} catch (e) {
			console.log(e)
			res.status(200).send({
				ok: false,
				message: 'Unable to delete organization. Please try again later or contact support.',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(create)