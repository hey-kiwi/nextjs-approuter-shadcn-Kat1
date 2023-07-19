import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const update = async (req: NextApiRequest, res: NextApiResponse) => {
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
			const account = await prisma.account.upsert({
				where: {
					email: req.body.email
				},
				update: { sub, ...req.body},
				create: { sub, ...req.body }
			})

			if (account?.id) {
				res.status(200).send({
					ok: true,
					message: 'Account updated!',
					data: account
				})
			} else {
				res.status(200).send({
					ok: false,
					message: 'Something went wrong! Unable to update account. Please try again later or contact support.',
					data: []
				})
			}
		} catch {
			res.status(200).send({
				ok: false,
				message: 'Something went wrong! Unable to update account. Please try again later or contact support.',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(update)