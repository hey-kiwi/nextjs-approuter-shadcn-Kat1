import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../../lib/prisma'
import xml from './util/xml'
import parse from './util/parse'
import digest from './util/digest'

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
			if (req.body.username && req.body.password && req.body.organization) {
				const xmlToken = xml.token(req.body.username)

				const requestToken = await fetch(`${process.env.FUSEMETRIX_API}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/xml'
					},
					body: xmlToken
				})

				if (requestToken.status == 200) {
					const responseXml = await requestToken.text()
					const token = await parse.token(responseXml)

					if (token) {
						const digested = await digest.create(token, req.body.password)
						const xmlData = xml.products(req.body.username, digested, 0)

						const requestProducts = await fetch(`${process.env.FUSEMETRIX_API}`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/xml'
							},
							body: xmlData
						})

						if (requestProducts.status == 200) {
							const fusemetrix = await prisma.fusemetrix.create({
								data: {
									username: req.body.username,
									password: req.body.password,

									organization: {
										connect: {
											id: req.body.organization.id
										}
									}
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
										message: 'Connected to FuseMetrix',
										data: organizations
									})
								} else {
									res.status(200).send({
										ok: true,
										message: 'Connected to FuseMetrix. Please refresh page',
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
								message: 'Unable to connect to FuseMetrix. Please try again later',
								data: []
							})
						}
					} else {
						res.status(200).send({
							ok: false,
							message: 'Unable to retrieve FuseMetrix token',
							data: []
						})
					}
				} else {
					res.status(200).send({
						ok: false,
						message: 'Invalid FuseMetrix username',
						data: []
					})
				}
			} else {
				res.status(200).send({
					ok: false,
					message: 'Please provide all information to connect to FuseMetrix',
					data: []
				})
			}
		} catch (e) {
			console.log(e)
			res.status(200).send({
				ok: false,
				message: 'Unable to connect to FuseMetrix. Please try again later or contact support',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(connect)