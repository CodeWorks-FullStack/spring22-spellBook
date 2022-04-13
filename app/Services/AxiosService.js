
// @ts-ignore
export const dndApi = axios.create({
  baseURL: "https://www.dnd5eapi.co/api",
  timeout: 8000
})

// @ts-ignore
export const sandboxApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api",
  timeout: 8000
})