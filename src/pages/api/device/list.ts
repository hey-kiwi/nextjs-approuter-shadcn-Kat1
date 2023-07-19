import { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const list = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != 'POST') {
		res.status(405).send({
			ok: false,
			message: 'Method not allowed',
			data: []
		})
	} else {
		try {
			if (req.body.organization) {
				const devices = await prisma.device.findMany({
					where: {
						organizationId: req.body.organization.id
					}
				})

				if (devices) {
					res.status(200).send({
						ok: true,
						message: 'Found devices',
						data: devices
					})
				} else {
					res.status(200).send({
						ok: false,
						message: 'Unable to get devices',
						data: []
					})
				}
			} else {
				res.status(200).send({
					ok: false,
					message: 'Unable to create device. Please try again later',
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

export default withApiAuthRequired(list)