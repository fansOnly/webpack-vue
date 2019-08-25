import Tools from '@/utils/Tools'

export default {
    columns: [
        {
			title: 'ID',
			dataIndex: 'id',
			width: '120px'
		},
        {
			title: '序号',
			dataIndex: 'sortnum',
			sorter: (a, b) => a.sortnum - b.sortnum,
			width: '80px'
		},
		{
			title: '标题',
			dataIndex: 'title',
			scopedSlots: { customRender: 'titlex' },
		},
		{
			title: '发布时间',
			dataIndex: 'createTime',
			width: '200px',
			sorter: (a, b) => Tools.date2Timestamp(a.createTime) - Tools.date2Timestamp(b.createTime)
		},
		{
			title: '状态',
			dataIndex: 'state',
			scopedSlots: { customRender: 'statex' },
			width: '100px',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionx' },
			width: '120px'
		}
	],
	pagination: {
		page: 1,
		pageSize: 10,
		showSizeChanger: true,
		showQuickJumper: true,
		showTotal: total => `共 ${total} 条信息`,
		// change: (page, pageSize) => console.log(`当前第 ${page} 页, 每页 ${pageSize} 条`),
		// showSizeChange: (current, size) => console.log(`当前第 ${current} 页, 每页 ${size} 条`),
	},
	actionList: ['编辑','删除']
}