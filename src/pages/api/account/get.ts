import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)
	const sub: string = session.user.sub
	const email: string = session.user.email

	if (req.method != 'GET') {
		res.status(405).send({
			ok: false,
			message: 'Method not allowed',
			data: []
		})
	} else {
		const account = await prisma.account.findUnique({
			where: {
				email: email
			}
		})

		if (account?.sub) {
			res.status(200).send({
				ok: true,
				message: 'Account is registered',
				data: account
			})
		} else {
			res.status(200).send({
				ok: false,
				message: 'Account is not registered',
				data: []
			})
		}
	}
}

export default withApiAuthRequired(get)