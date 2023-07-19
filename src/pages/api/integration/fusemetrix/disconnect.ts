import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../../lib/prisma'

const disconnect = async (req: NextApiRequest, res: NextApiResponse) => {
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
			if (req.body.organization) {
				const fusemetrix = await prisma.fusemetrix.delete({
					where: {
						id: req.body.organization.fusemetrix.id
					}
				})

				if (fusemetrix) {
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

					if (organizations) {
						res.status(200).send({
							ok: true,
							message: 'Disconnected from FuseMetrix',
							data: organizations
						})
					} else {
						res.status(200).send({
							ok: true,
							message: 'Disconnected from FuseMetrix. Please refresh page',
							data: organizations
						})
					}
				} else {
					res.status(200).send({
						ok: false,
						message: 'Something went wrong. Please try again later',
						data: []
					})
				}

			} else {
				res.status(200).send({
					ok: false,
					message: 'Please provide all information to disconnect to FuseMetrix'
				})
			}
		} catch
			(e) {
			console.log(e)
			res.status(200).send({
				ok: false,
				message: 'Unable to disconnect to FuseMetrix. Please try again later or contact support',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(disconnect)