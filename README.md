# Hey'Kiwi Portal

## About

The Hey'Kiwi Portal the bridge between booking / payment solutions and the Hey'Kiwi Kiosk.

User's can do the following on the Portal:

- Manage organizations and kiosk devices
- Integrate with booking / payment solutions
- Track booking, transactions and more

## Infrastructure

The application is:

- built on Next.js and Posgres
- deployed on Railway.app

We use other libraries:

- Auth0 - Authentication
- Prisma - Database transactions
- Mantine - React components library

## Installation

1. Clone repository locally
2. Add environment variables (use example)
3. Setup repository with ```yarn```
4. Start app with ```yarn dev```

# Notes

- Build pipeline is development -> preview -> production

# Endpoints

Below are list of endpoints implemented in the API route

## Account

### Get

To get the logged on account, make a ```GET``` request to ```/api/account/get``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const request = await fetch('/api/account/get')

const response: IResponse = await request.json()

console.log(response)
```

### Update

To update (including register), make a ```POST``` request to ```/api/account/update``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const data = {
	name: '',
	email: '',
	phone: ''
}

const request = await fetch('/api/account/update', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
})

const response: IResponse = await request.json()

console.log(response)
```

## Organization

### List

To get a list of organizations that an account owns or has access to, make a ```GET``` request
to ```'/api/organization/list'``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const request = await fetch('/api/organization/list')

const response: IResponse = await request.json()

console.log(response)
```

### Get

To get data of an organization, make a ```POST``` request to ```'/api/organization/get'``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const organization = {
	id: '',
	name: '',
	email: '',
	phone: '',
	location: '',
	logo: ''
}

const request = await fetch('/api/organization/get', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
})

const response: IResponse = await request.json()

console.log(response)
```

### Create

To create an organization, make a ```POST``` request to ```'/api/organization/create'``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const organization = {
	id: '',
	name: '',
	email: '',
	phone: '',
	location: ''
}

const request = await fetch('/api/organization/get', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
})

const response: IResponse = await request.json()

console.log(response)
```

### Update

To update an organization, make a ```POST``` request to ```'/api/organization/update'``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const organization = {
	id: '',
	name: '',
	email: '',
	phone: '',
	location: '',
	logo: ''
}

const request = await fetch('/api/organization/update', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
})

const response: IResponse = await request.json()

console.log(response)
```

### Delete

To delete an organization, make a ```POST``` request to ```'/api/organization/delete'``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const organization = {
	id: '',
	name: '',
	email: '',
	phone: '',
	location: '',
	logo: ''
}

const request = await fetch('/api/organization/delete', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
})

const response: IResponse = await request.json()

console.log(response)
```

## Member

### Invite

To invite a member to an organization, make a ```POST``` request to ```'/api/member/invite'``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const organization = {
	id: '',
	name: '',
	email: '',
	phone: '',
	location: ''
}

const member = {
	accountEmail: '',
	organizationId: ''
}

const request = await fetch('/api/member/invite', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ organization, member })
})

const response: IResponse = await request.json()

console.log(response)
```

### Accept

To accept in invitation to an organization, make a ```POST``` request to ```'/api/member/accept'``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const organization = {
	id: '',
	name: '',
	email: '',
	phone: '',
	location: ''
}

const member = {
	accountEmail: '',
	organizationId: ''
}

const request = await fetch('/api/organization/update', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ organization, member })
})

const response: IResponse = await request.json()

console.log(response)
```

### Remove / Leave

To remove a member or leave an organization, make a ```POST``` request to ```'/api/member/remove'``` endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const organization = {
	id: '',
	name: '',
	email: '',
	phone: '',
	location: ''
}

const member = {
	accountEmail: '',
	organizationId: ''
}

const request = await fetch('/api/organization/remove', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ organization, member })
})

const response: IResponse = await request.json()

console.log(response)
```

## FuseMetrix

### Connect

To connect to a FuseMetrix integration, make a ```POST``` request to ```'/api/integration/fusemetrix/connect'```
endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const organization = {
	id: '',
	name: '',
	email: '',
	phone: '',
	location: ''
}

const fusemetrix = {
	username: '',
	password: ''
}

const request = await fetch('/api/integration/fusemetrix/connect', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ organization, fusemetrix })
})

const response: IResponse = await request.json()

console.log(response)
```

### Disconnect

To disconnect to a FuseMetrix integration, make a ```POST``` request to ```'/api/integration/fusemetrix/disconnect'```
endpoint.

```tsx
import { IResponse } from '../interfaces/response'

const organization = {
	id: '',
	name: '',
	email: '',
	phone: '',
	location: ''
}

const request = await fetch('/api/integration/fusemetrix/disconnect', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ organization })
})

const response: IResponse = await request.json()

console.log(response)
```