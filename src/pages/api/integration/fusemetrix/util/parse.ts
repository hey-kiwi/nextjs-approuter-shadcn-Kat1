import xml2js from 'xml2js'

const flatten = (array: any) => {
  const initialValue = {}
  for(let i = 0; i < array?.length; i++ ) {
    Object.assign(initialValue, array[i]);
  }

  return initialValue
}

const token = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  const token = parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:RequestTokenResponse'][0]['return'][0]['_']

  if (token) return token
  else return null
}

const getLocations = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  const locations = parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:GetLocationsResponse'][0]['return'][0]['item']?.map((location: any) => {
    return {
      id: location['key'][0]['_'],
      name: location['value'][0]['item'][0]['value'][0]['_'],
      categoryId: location['value'][0]['item'][1]['value'][0]['_'],
      extraId: location['value'][0]['item'][3]['value'][0]['_'],
    }
  }) ?? []

  if (locations) return locations
  else return []
}

const getProductCategoryById = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  const categories = flatten(parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:GetProductCategoryByIdResponse'][0]['return'][0]['item']?.map((category: any) => {
    return {
      [category['key'][0]['_']]: category['value'][0]['_'] ?? null,
    }
  })) ?? []

  if (categories) return categories
  else return []
}

const addBasket = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  const basket = parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:AddBasketResponse'][0]['return'][0]['item']

  const basketId = basket[0]['_']
  const secret = basket[1]['_']

  if (basket) return { basketId, secret }
  else return null
}

const addProductToBasket = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  const addProductToBasket = flatten(parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:AddProductToBasketResponse'][0]['return'][0]['item'][1]['value'][0]['item']?.map((product: any, key: any) => {
    return {
      [key]: flatten(product['item']?.map((item: any) => {
        return {
          [item['key'][0]['_'] ?? 'item']: item['value'][0]['_'] ?? flatten(item['value'][0]['item']?.map((extra: any) => {
            return {
              [extra['key'][0]['_'] ?? 'item']: extra['value'][0]['_'] ?? null
            }
          })) ?? null
        }
      }))
    }
  }) ?? null)

  return addProductToBasket
}
const addProductToBasketWithRemovedProduct = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  const addProductToBasket: any = flatten(parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:AddProductToBasketResponse'][0]['return'][0]['item'][1]['value']?.map((product: any, key: any) => {
    return {
      [key]: flatten(product['item']?.map((item: any) => {
        return {
          [item['key'][0]['_'] ?? 'item']: item['value'][0]['_'] ?? flatten(item['value'][0]['item']?.map((extra: any) => {
            return {
              [extra['key'][0]['_'] ?? 'item']: extra['value'][0]['_'] ?? null
            }
          })) ?? null
        }
      }))
    }
  }) ?? null)

  return addProductToBasket[0]
}

const removeProductFromBasket = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  // const removeProductFromBasket = flatten(parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:DeleteProductFromBasketResponse'][0]['return'][0]['item'][1]['value'][0]['item'][1]['value'][0]['item']?.map((product: any, key) => {
  //   return {
  //     [key]: flatten(product['item']?.map((item: any) => {
  //       return {
  //         [item['key'][0]['_'] ?? 'item']: item['value'][0]['_'] ?? flatten(item['value'][0]['item']?.map((extra: any) => {
  //           return {
  //             [extra['key'][0]['_'] ?? 'item']: extra['value'][0]['_'] ?? null
  //           }
  //         })) ?? null
  //       }
  //     }))
  //   }
  // }) ?? null)

  // return removeProductFromBasket
  return parsedXml
}

const products = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  const raw = parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:GetProductsByCategoryResponse'][0]['return'][0]['item'][3]['value'][0]['item']
  const products = raw?.map((product: any) => {
    return flatten(product['value'][0]['item']?.map((item: any) => {
      return {
        [item['key'][0]['_']]: item['value'][0]['_'] ?? flatten(item['value'][0]['item']?.map((extra: any) => {
          return {
            [extra['key'][0]['_'] ?? 'item']: extra['value'][0]['_'] ?? flatten(extra['value'][0]['item']?.map((extra1: any) => {
              return {
                [extra1['key'][0]['_'] ?? 'item']: extra1['value'][0]['_'] ?? flatten(extra1['value'][0]['item']?.map((extra2: any) => {
                  return {
                    [extra2['key'][0]['_'] ?? 'item']: extra2['value'][0]['_'] ?? flatten(extra2['value'][0]['item']?.map((extra3: any) => {
                      return {
                        [extra3['key'][0]['_'] ?? 'item']: extra3['value'][0]['_'] ?? null
                      }
                    })) ?? null
                  }
                })) ?? null
              }
            })) ?? null
          }
        })) ?? null
      }
    }))
  })

  if (products) return products
  else return []
}

const productAvailabilityMultiple = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  const productAvailabilityMultiple = parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:GetProductBookingAvailabilityMultipleResponse'][0]['return'][0]['item'].map((date: any) => date['_'])

  return productAvailabilityMultiple
}

const productAvailability = async (xml: string) => {
  const parsedXml = await xml2js.parseStringPromise(xml)
  const raw = parsedXml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:GetProductBookingAvailabilityResponse'][0]['return'][0]['item']
  const productAvailability = flatten(raw?.map((product: any) => {
    return {
      [product['key'][0]['_']]: {
        time: product['key'][0]['_'],
        ...flatten(product['value'][0]['item']?.map((item: any) => {
          return {
            [item['key'][0]['_']]: item['value'][0]['_'] ?? flatten(item['value'][0]['item']?.map((extra: any) => {
              return extra
            })) ?? null
          }
        }))
      }
    }
  }))

  return productAvailability
}

const parse = {
  token,
  getLocations,
  getProductCategoryById,
  addBasket,
  addProductToBasket,
  addProductToBasketWithRemovedProduct,
  removeProductFromBasket,
  products,
  productAvailabilityMultiple,
  productAvailability
}

export default parse