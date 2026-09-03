import axios from 'axios'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
    baseURL: '/api', // 基础URL
    timeout: 5000 // 超时时间
})

// 实例化路由
const router = useRouter()

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['token'] = token // 自定义token字段
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        const{ data,config } = response
        // 处理响应数据
        if (data.code === '200') {
            return data.data
        } else {
            if (data.code === '-1') {
                if(!config.url?.includes('/login')) {
                    ElMessage.error(data.msg || '登录过期，请重新登录')

                    // 清除token
                    localStorage.removeItem('token')
                    localStorage.removeItem('userInfo')
                    router.push('/auth/login')
                }  else {
                    return Promise.reject('网络请求失败')
                }
            }
        }
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service
