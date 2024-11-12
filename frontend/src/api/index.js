// 使用环境变量中的 API_URL
const baseURL = import.meta.env.VITE_API_URL || '/api'

// 在 axios 配置中使用这个 baseURL
const api = axios.create({
  baseURL: baseURL,
  timeout: 15000
}) 