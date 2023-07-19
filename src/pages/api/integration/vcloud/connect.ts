import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../../lib/prisma'

const connect = async (req: NextApiRequest, res: NextApiResponse) => {
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
			if (req.body.apiKey && req.body.serviceName && req.body.merchantName && req.body.organization) {
				const vcloud = await prisma.vcloud.create({
					data: {
						apiKey: req.body.apiKey,
						serviceName: req.body.serviceName,
						merchantName: req.body.merchantName,

						organization: {
							connect: {
								id: req.body.organization.id
							}
						}
					}
				})

				if (vcloud) {
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
							message: 'Connected to VCloud',
							data: organizations
						})
					} else {
						res.status(200).send({
							ok: true,
							message: 'Connected to VCloud. Please refresh page',
							data: organizations
						})
					}
				} else {
					res.status(200).send({
						ok: false,
						message: 'Unable to connect to VCloud. Please try agian later',
						data: []
					})
				}
			} else {
				res.status(200).send({
					ok: false,
					message: 'Please provide all information to proceed',
					data: []
				})
			}
		} catch (e: any) {
			console.log(e)
		}
	}
}

export default withApiAuthRequired(connect)