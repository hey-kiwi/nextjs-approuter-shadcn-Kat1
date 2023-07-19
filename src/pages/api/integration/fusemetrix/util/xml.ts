import digest from './digest'

const token = (username: string) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header />` +
		`<soap:Body xmlns="fusemetrix">` +
		`<RequestToken>` +
		`<UserName>${username}</UserName>` +
		`</RequestToken>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const getLocations = (username: string, digest: string) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<GetLocations />` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const getProductCategoryById = (username: string, digest: string, categoryId: string) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<GetProductCategoryById>` +
		`<categoryId>${categoryId}</categoryId>` +
		`</GetProductCategoryById>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const addBasket = (username: string, digest: string) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<AddBasket />` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const getBasket = (username: string, digest: string, basketId: string, secret: string) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<GetBasket>` +
		`<basketID>${basketId}</basketID>` +
		`<secret>${secret}</secret>` +
		`</GetBasket>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const addProductToBasket = (username: string, digest: string, basketId: string, secret: string, productId: string, quantity: number, isAddon: boolean, extra: any) => {
	const extraXML = !isAddon ?
		`<extra>
      ${extra.map((extra: any) => {
			return (
				`<voucher>false</voucher>` +
				`<locationid>${extra.locationId}</locationid>` +
				`<date>${extra.date}</date>` +
				`<time>${extra.time}</time>`
			)
		})}
    </extra>`
		: ''

	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<AddProductToBasket>` +
		`<basketID>${basketId}</basketID>` +
		`<secret>${secret}</secret>` +
		`<prodID>${productId}</prodID>` +
		`<qty>${quantity}</qty>` +
		`${extraXML}` +
		`</AddProductToBasket>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const removeProductFromBasket = (username: string, digest: string, basketId: string, secret: string, productkey: number) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<DeleteProductFromBasket>` +
		`<basketID>${basketId}</basketID>` +
		`<secret>${secret}</secret>` +
		`<productkey>${productkey}</productkey>` +
		`</DeleteProductFromBasket>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const updateBasketDeliveryData = (username: string, digest: string, basketId: string, secret: string, data: any) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<UpdateBasketBillingData>` +
		`<basketID>${basketId}</basketID>` +
		`<secret>${secret}</secret>` +
		`<title>${data.title}</title>` +
		`<firstname>${data.firstname}</firstname>` +
		`<surname>${data.lastname}</surname>` +
		`<company>${data.company}</company>` +
		`<tel></tel>` +
		`<mobile>${data.mobile}</mobile>` +
		`<email>${data.email}</email>` +
		`<add>${data.add}</add>` +
		`<add2>${data.add2}</add2>` +
		`<add3>${data.add3}</add3>` +
		`<city>${data.city}</city>` +
		`<county>${data.county}</county>` +
		`<postcode>${data.postcode}</postcode>` +
		`<country>${data.country}</country>` +
		`</UpdateBasketBillingData>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const addOrderFromBasket = (username: string, digest: string, basketId: number, secret: string) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<AddOrderFromBasket>` +
		`<basketID>${basketId}</basketID>` +
		`<secret>${secret}</secret>` +
		`</AddOrderFromBasket>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const products = (username: string, digest: string, categoryId: number) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<GetProductsByCategory>` +
		`<categoryId>5</categoryId>` +
		`</GetProductsByCategory>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const productAvailabilityMultiple = (username: string, digest: string, productId: string, quantity: number) => {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<GetProductBookingAvailabilityMultiple>` +
		`<productID>${productId}</productID>` +
		`<locationID>9</locationID>` +
		`<quantity>${quantity}</quantity>` +
		`<pricingTypeID>null</pricingTypeID>` +
		`<startDate>${new Date(Date.now() - 1728e5).toISOString().split('T')[0]}</startDate>` +
		`<end>${new Date(Date.now() + 6048e5).toISOString().split('T')[0]}</end>` +
		`</GetProductBookingAvailabilityMultiple>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const productAvailability = (username: string, digest: string, productId: string, quantity: number, selectedDate: string) => {
	// const formattedDate = new Date(selectedDate).toISOString().split('T')[0]
	return (
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
		`<soap:Header>` +
		`<Auth xmlns="fusemetrix">` +
		`<digest>${digest}</digest>` +
		`<username>${username}</username>` +
		`</Auth>` +
		`</soap:Header>` +
		`<soap:Body xmlns="fusemetrix">` +
		`<GetProductBookingAvailability>` +
		`<productID>${productId}</productID>` +
		`<locationID>9</locationID>` +
		`<selectedDate>${selectedDate}</selectedDate>` +
		`<quantity>${quantity}</quantity>` +
		`<pricingTypeID>null</pricingTypeID>` +
		`</GetProductBookingAvailability>` +
		`</soap:Body>` +
		`</soap:Envelope>`
	)
}

const xml = {
	token,
	getLocations,
	getProductCategoryById,
	addBasket,
	getBasket,
	addProductToBasket,
	removeProductFromBasket,
	addOrderFromBasket,
	updateBasketDeliveryData,
	products,
	productAvailabilityMultiple,
	productAvailability
}

export default xml