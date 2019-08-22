<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
            <!-- 内容区域 -->
            <div class="option-bar">
                <!-- 内容操作区域 -->
                <a-button style="margin-right:10px;" type="primary">
                    <router-link to="/admin/list/1/edit/5">新增</router-link>
                </a-button>
            </div>
            <!-- 内容展示区域 -->
            <a-table ref="dataListTable" rowKey="id" :loading="loading" :columns="columns" :dataSource="dataSource" :pagination="pagination" >
                <span slot="actionx" slot-scope="action, record, index">
                    <router-link :to="{name:'listEditPage', params: {classid: record.classid, id: record.id}}">编辑</router-link>
                    <a-divider type="vertical" />
                    <router-link :to="{name:'listEditPage', params: {classid: record.classid, id: record.id}}">管理</router-link>
                    <a-divider type="vertical" />
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(index)">
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';
    import { getBannerClassList } from '@/api/siteinfo';

    const columns = [
        {
			title: '分类ID',
            dataIndex: 'id',
            width: '200px'
        },
        {
			title: '序号',
			dataIndex: 'sortnum',
			width: '80px'
		},
		{
			title: '分类名称',
			dataIndex: 'title',
        },
        {
			title: '发布时间',
			dataIndex: 'createTime',
            width: '200px'
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionx' },
			width: '200px'
		}
	];
	// const pagination = {
	// 	page: 1,
	// 	pageSize: 15,
	// };

    export default {
        name: 'Banner',
        components: {
            BreadCrumbComponent,
        },
        data () {
            return {
                dataSource: [],
                columns,
                pagination: false,
                loading: true,
            }
        },
        beforeCreate () {
            (async () => {
                const dataSource = await getBannerClassList();
				this.loading = false;
				this.dataSource = dataSource.data;
			})()
        },
        methods: {
            delItem(index) {
				console.log(`删除第 ${index} 项`);
				this.dataSource.splice(index, 1);
			},
        }
    }
</script>