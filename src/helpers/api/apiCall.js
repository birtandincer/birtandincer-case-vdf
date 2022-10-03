// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import { message } from 'antd';


export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = {}
  if (customConfig.token)
    headers.Authorization = `Bearer ${customConfig.token}`

  const config = {
    cache: "no-cache",
    method: customConfig.method,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }


  if (body && customConfig.customBody === undefined) {
    config.body = JSON.stringify(body)
  }

  if (customConfig.customBody) {
    config.body = customConfig.customBody
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)

    if (response.status === 401)
      message.error("Kimlik doğrulama hatası lütfen tekrar oturum açınız.");

    if (response.status === 400)
      message.error("Lütfen requesti kontrol ediniz.");

    if (response.status === 500)
      message.error("Lütfen internet bağlantınızı kontrol ediniz.");

    if (response.ok) {
      data = await response.json().catch((e) => console.log(e));

      
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, {
    ...customConfig, headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }, method: 'GET'
  })
}

client.post = function (endpoint, body, customConfig = {}) {

  return client(endpoint, {
    ...customConfig, headers: customConfig.headers === undefined ? {
      Accept: "*/*",
      "Content-Type": "application/json",
      Connection: "keep-alive",
      "Accept-Encoding": "gzip,deflate,br",
      "Access-Control-Allow-Origin": "*",
    } : customConfig.headers, method: 'POST', body
  })
}

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig, headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Connection: "keep-alive",
      "Accept-Encoding": "gzip,deflate,br",
      "Access-Control-Allow-Origin": "*",
    }, method: 'PUT', body
  })
}

client.patch = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig, headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Connection: "keep-alive",
      "Accept-Encoding": "gzip,deflate,br",
      "Access-Control-Allow-Origin": "*",
    }, method: 'PATCH', body
  })
}

client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, {
    ...customConfig, headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Connection: "keep-alive",
      "Accept-Encoding": "gzip,deflate,br",
      "Access-Control-Allow-Origin": "*",
    }, method: 'DELETE', body
  })
}
