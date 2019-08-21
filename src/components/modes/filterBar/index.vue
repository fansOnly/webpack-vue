<template>
	<div>
		<a-form class="ant-advanced-search-form" :form="form" @submit.prevent="handleFilter">
			<a-row :gutter="24">
				<a-col
					v-for="(item, index) in filteritems"
					:key="item.key"
					:span="6"
					:style="{ display: index < count ? 'block' : 'none' }"
				>
					<a-form-item :label="item.name">
						<template v-if="item.type == 'text'">
							<a-input
								v-decorator="[
                                    item.key,
                                    {
                                    rules: [{
                                        message: item.placeholder,
                                    }],
									initialValue: conditions.get(item.key) && conditions.get(item.key)[0] || ''
                                    }
                                ]"
								:placeholder="item.placeholder"
							/>
						</template>
						<template v-if="item.type == 'date'">
							<a-date-picker
								v-decorator="[
                                    item.key,
                                    {
                                    rules: [{
                                        required: false,
                                        message: item.placeholder,
                                    }],
                                    }
                                ]"
								:placeholder="item.placeholder"
							/>
						</template>
						<template v-if="item.type == 'select'">
							<a-select
								v-decorator="[
                                    item.key,
                                    {
                                    rules: [{
                                        required: false,
                                        message: item.placeholder,
                                    }],
                                    initialValue: conditions.get(item.key) &&item.list[conditions.get(item.key)[0]].value || item.list[0].value,
                                    }
                                ]"
							>
								<template v-for="(select, index) in item.list">
									<a-select-option :key="index" :value="select.value">{{select.name}}</a-select-option>
								</template>
							</a-select>
						</template>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="24" :style="{ textAlign: 'right' }">
					<a-button type="primary" html-type="submit">搜索</a-button>
					<a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
					<a
						v-if="filteritems.length > 4"
						:style="{ marginLeft: '8px', fontSize: '12px' }"
						@click="toggle"
					>
						{{expand ? '收起' : '展开'}}
						<a-icon :type="expand ? 'up' : 'down'" />
					</a>
				</a-col>
			</a-row>
		</a-form>
	</div>
</template>
<script>
	import { mapState } from 'vuex';

	const filteritems = [
		{
			key: 'title',
			name: '标题',
			placeholder: '请输入关键字',
			type: 'text'
		},
		{
			key: 'admin',
			name: '发布人',
			placeholder: '请输入关键字',
			type: 'text'
		},
		{
			key: 'publishdate',
			name: '创建时间',
			placeholder: '请选择发布日期',
			type: 'date'
		},
		{
			key: 'state',
			name: '状态',
			placeholder: '请选择状态',
			type: 'select',
			list: [
				{
					name: '全部',
					value: ''
				},
				{
					name: '已下架',
					value: 0
				},
				{
					name: '待审核',
					value: 1
				},
				{
					name: '已审核',
					value: 2
				},
				{
					name: '已置顶',
					value: 3
				}
			]
		}
	];

	export default {
		name: 'filterBarComponent',
		data() {
			return {
				filteritems,
				form: this.$form.createForm(this),
				expand: false
			};
		},
		computed: {
			...mapState({
				conditions: state => state.filterStore.conditions
			}),
			count() {
				return this.expand ? 11 : 7;
			}
		},
		created () {
		},
		methods: {
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
				});
			},
			handleReset() {
				this.form.resetFields();
			},
			toggle() {
				this.expand = !this.expand;
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";
</style>
