import { get } from '@/utils/http'

// 获取banner分类
export const getBannerClassList = params => get('/mock/banner/class', params)