const get = <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params, json = true }: { params?: any; json?: boolean }
) => {
  return new Promise<T>((resolve, reject) => {
    let _params = ''

    if (params) {
      _params = Object.keys(params)
        .filter((key) => params[key] !== undefined)
        .map((key) => `${key}=${params[key]}`)
        .join('&')
    }

    fetch(`${url}?${_params}`, { method: 'GET' })
      .then((response) => {
        if (json) {
          return response.json()
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resolve(response as any)
        }
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error))
  })
}

const post = <T, D>(url: string, body: D) => {
  return new Promise<T>((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error))
  })
}

export { get, post }
