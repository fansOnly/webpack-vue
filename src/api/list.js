// import Mock from 'mock'
import { get } from '@/utils/http'

export const getListData = params => get('/mock/list.page', params)


// function format (data) {
//     data.createTime = data.createTime && ;
//     return data;
// }