import { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != 'POST') {
		res.status(405).send({
			ok: false,
			message: 'Method not allowed',
			data: []
		})
	} else {
		try {
			if (req.body.device && req.body.organization) {
				const device = await prisma.device.findFirst({
					where: {
						organizationId: req.body.organization.id,
						id: req.body.device.id
					}
				})

				if (device) {
					res.status(200).send({
						ok: true,
						message: 'Found device',
						data: device
					})
				} else {
					res.status(200).send({
						ok: false,
						message: 'Unable to get device',
						data: []
					})
				}
			} else {
				res.status(200).send({
					ok: false,
					message: 'Unable to find device. Please try again later',
					data: []
				})
			}
		} catch (e) {
			res.status(200).send({
				ok: false,
				message: 'Unable to find device. Please try again later or contact support.',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(get)