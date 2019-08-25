import { get, post } from '@/utils/http'

// 获取banner分类
export const getBannerClassList = params => get('/banner/class/index', params)
// 获取banner分类详情
export const getBannerClassDetail = params => get('/banner/class/detail', params)
// 修改banner分类提交
export const addBannerClass = params => post('/banner/class/add', params)
// 新增banner分类提交
export const updateBannerClass = params => post('/banner/class/update', params)

// 获取banner
export const getBannerList = params => get('/banner/index', params)
// 获取banner详情
export const getBannerDetail = params => get('/banner/detail', params)
// 修改banner提交
export const addBanner = params => post('/banner/add', params)
// 新增banner提交
export const updateBanner = params => post('/banner/update', params)