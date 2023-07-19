import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'
import { generate } from './util/nanoid'

const update = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != 'POST') {
		res.status(405).send({
			ok: false,
			message: 'Method not allowed',
			data: []
		})
	} else {
		try {
			if (req.body.device && req.body.organization) {
				const key = await generate()
				const device = await prisma.device.update({
					where: {
						id: req.body.device.id
					},
					data: { ...req.body.device }
				})

				if (device) {
					const devices = await prisma.device.findMany({
						where: {
							organizationId: req.body.organization.id
						}
					})

					if (devices) {
						res.status(200).send({
							ok: true,
							message: 'Device updated',
							data: devices
						})
					} else {
						res.status(200).send({
							ok: true,
							message: 'Please refresh page to update list',
							data: device
						})
					}
				} else {
					res.status(200).send({
						ok: false,
						message: 'Unable to updated device. Please try again later',
						data: []
					})
				}
			} else {
				res.status(200).send({
					ok: false,
					message: 'Please provide complete information',
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

export default withApiAuthRequired(update)