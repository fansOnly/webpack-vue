<template src="./index.html">
</template>
<script>
	import { Modal } from 'ant-design-vue';
	import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

	import { getListData } from '@/api/list';

	import listPageConfig from './config';

	export default {
		name: 'ListPage',
		components: {
			BreadCrumbComponent,
		},
		data() {
			return {
				form: this.$form.createForm(this),
				dataSource: [],
				columns: listPageConfig.columns,
				TOTAL: 0,
				pagination: {},
				selectedRowKeys: [],
				loading: true,
			};
		},
		computed: {
			rowSelection () {
				let { selectedRowKeys } = this;
				return {
					selectedRowKeys,
					onChange: this.checkItems,
				}
			}
		},
		beforeCreate () {
			(async () => {
				const { page, pageSize } = { page: listPageConfig.pagination.page, pageSize: listPageConfig.pagination.pageSize };
				const datax = await getListData({page, pageSize});
				this.loading = false;
				this.dataSource = datax.data;
				this.TOTAL = datax.total;
				this.pagination = {
					total: datax.total,
					...listPageConfig.pagination
				};
				// console.log('getListData', datax);
			})()
		},
		mounted() {
			// console.log('router info:', this.$route);
			this.classid = this.$route.params.classid;
		},
		methods: {
			checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			delItem(index) {
				console.log(`删除第 ${index} 项`);
				this.dataSource.splice(index, 1);
			},
			delMultiItems() {
				const that = this;
				Modal.confirm({
					title: '删除提醒',
					content: '确认删除当前选中的信息吗？',
					okType: 'danger',
					onOk() {
						that.dataSource = that.dataSource.filter(
							item => !that.selectedRowKeys.includes(item.id)
						);
						that.selectedRowKeys = [];
					},
					onCancel() {
						console.log('Cancel');
					}
				});
			},
			handleFilter() {
				this.form.validateFields((error, fieldsValue) => {
					if (error) {
						console.log('error', error);
						return;
					}
					const values = {
						...fieldsValue,
						publishdate:
							fieldsValue['publishdate'] &&
							fieldsValue['publishdate'].format('YYYY-MM-DD')
					};
					console.log('handleFilter form: ', values);
					this.$refs.dataListTable.handleChange();
				});
			},
			handleChange (pagination, filters, sorter) {
				if (!this.dataSource.length) return;
				this.loading = true;
				console.log('===============================params-start==================================================');
				console.log(pagination);
				// console.log(filters);
				console.log(sorter);
				console.log('===============================params-end====================================================');
				// const params = {
				//     page: pagination.current,
				//     pageSize: pagination.pageSize,
				//     sortField: sorter.field || '',
				//     sortOrder: sorter.order || '',
				//     ...this.filter,
				// }
				// console.log('===============================params-start==================================================');
				// console.log(params);
				// console.log('===============================params-end====================================================');
				// todo
				setTimeout(() => {
					this.loading = false;
				}, 0);
			},
			handleReset() {
				this.form.resetFields();
				this.$refs.dataListTable.handleChange();
			},
			getStatus (state) {
				const index = ['已下架', '待审核', '已审核', '已置顶'].indexOf(state);
				return ['default', 'processing', 'success', 'error'][index]
			},
		}
	};
</script>
<style scoped>
	.option-bar {
		padding-bottom: 15px;
		display: flex;
		align-items: center;
	}

	.ant-advanced-search-form {
		margin-bottom: 15px;
		padding: 15px;
		background: #fbfbfb;
		border: 1px solid #d9d9d9;
		border-radius: 3px;
	}
</style>

