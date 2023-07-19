import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const invite = async (req: NextApiRequest, res: NextApiResponse) => {
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
			const account = await prisma.member.findFirst({
				where: {
					account: {
						sub: sub
					},
					organizationId: req.body.id,
					owner: true
				}
			})

			if (account && account.owner) {
				const existing = await prisma.account.findFirst({
					where: {
						email: req.body.member.email
					}
				})

				if (existing) {
					const member = await prisma.member.create({
						data: {
							account: {
								connect: {
									id: existing.id
								}
							},
							organization: {
								connect: {
									id: req.body.organization.id
								}
							},
							owner: false,
							accepted: false
						}
					})

					if (!member) {
						res.status(200).send({
							ok: false,
							message: 'Unable to invite. Please try again later or contact support',
							data: []
						})
					}
				} else {
					const account = await prisma.account.create({
						data: {
							email: req.body.member.email
						}
					})

					const member = await prisma.member.create({
						data: {
							account: {
								connect: {
									id: account.id
								}
							},
							organization: {
								connect: {
									id: req.body.organization.id
								}
							},
							owner: false,
							accepted: false
						}
					})

					if (!member) {
						res.status(200).send({
							ok: false,
							message: 'Unable to invite. Please try again later or contact support',
							data: []
						})
					}
				}

				res.status(200).send({
					ok: true,
					message: 'Invitation sent',
					data: []
				})
			} else {
				res.status(200).send({
					ok: false,
					message: 'You do not have permission to invite',
					data: []
				})
			}
		} catch (e) {
			res.status(200).send({
				ok: false,
				message: 'Unable X to invite. Please try again later or contact support.',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(invite)