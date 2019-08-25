<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
            <!-- 内容区域 -->
            <div class="option-bar">
                <!-- 内容操作区域 -->
                <a-button style="margin-right:10px;" type="primary" @click="showModal('add')">新增</a-button>
            </div>
            <!-- 内容展示区域 -->
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="bannerClassList" :pagination="pagination" bordered >
                <span slot="actionx" slot-scope="action, record, index">
                    <a @click="showModal('edit', record.id)">编辑</a>
                    <a-divider type="vertical" />
                    <!-- <a @click="showModal('edit', record.id)">管理</a> -->
                    <router-link :to="{name: 'bannerList', params: {classid: record.id}}">管理</router-link>
                    <a-divider type="vertical" />
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(index)">
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
            <!-- banner分类新增/修改弹窗 -->
            <ModalForm ref="bannerClass" v-slot="{ form }" :visible="visible" :action="action" :modalTitle="modalTitle" @cancel="handleCancel" @ok="handleSubmit">
                <a-form-item v-if="action == 'edit'" label="分类ID">
                    <a-input v-decorator="['id', {initialValue: initialBannerClass.id}]" disabled />
                </a-form-item>
                <a-form-item label="分类名称">
                    <a-input v-decorator="['name', {rules: [{required: true,}], initialValue: initialBannerClass.name}]" />
                </a-form-item>
                <a-form-item label="分类描述">
                    <a-input v-decorator="['content', {initialValue: initialBannerClass.content}]" />
                </a-form-item>
            </ModalForm>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';
    import ModalForm from '@/components/modalpage/form.vue';

    import { message } from 'ant-design-vue';

    import { getBannerClassList, addBannerClass, getBannerClassDetail, updateBannerClass } from '@/api/banner';

    const columns = [
        {
			title: '分类ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '分类名称',
			dataIndex: 'title',
        },
        {
			title: '分类描述',
			dataIndex: 'content',
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
			width: '180px'
		}
	];

    export default {
        name: 'Banner',
        components: {
            BreadCrumbComponent,
            ModalForm,
        },
        data () {
            return {
                bannerClassList: [],
                columns,
                pagination: false,
                loading: true,
                visible: false,
                modalTitle: '',
                action: '',
                initialBannerClass: {},
            }
        },
        created () {
            this.getBannerClassListFn();
        },
        methods: {
            delItem(index) {
				console.log(`删除第 ${index} 项`);
				this.bannerClassList.splice(index, 1);
            },
            showModal (action, editId) {
                if (action == 'add') {
                    this.action = action;
                    this.modalTitle = '新增幻灯片分类';
                    this.visible = true;
                    // this.initialBannerClass.id = parseInt(Math.random() * 100000000000) + 1;
                } else if (action == 'edit') {
                    this.action = action;
                    this.editId = editId;
                    this.modalTitle = '编辑幻灯片分类';
                    this.getBannerclassDetailFn();
                } else {
                    message.error('非法操作');
                }
            },
            handleCancel () {
                this.resetFormData();
                this.visible = false;
            },
            handleSubmit () {
                const form = this.$refs.bannerClass.form;
                form.validateFields((err, values) => {
                    if (!err) {
                        console.log('form values: ', values);
                        if (form.isFieldsTouched()) {
                            if (this.action == 'add') {
                                this.addBannerClassFn(values);
                            }
                            if(this.action == 'edit') {
                                this.updateBannerClassFn(values);
                            }
                        } else {
                            this.handleCancel();
                        }
                    }
                })
            },
            resetFormData () {
                this.initialBannerClass = {};
                const form = this.$refs.bannerClass.form;
                form.resetFields();
            },
            // api
            async getBannerClassListFn () {
                const data = await getBannerClassList();
				this.loading = false;
                this.bannerClassList = data.data;

                this.resetFormData();
            },
            async getBannerclassDetailFn () {
                const data = await getBannerClassDetail({id: this.editId})
                if (data.code == '200') {
                    this.initialBannerClass = data.data;
                    this.visible = true;
                }
            },
            async addBannerClassFn (params) {
                const data = await addBannerClass(params);
                if (data.code == '200') {
                    message.success(data.msg, 1, () => {
                        this.getBannerClassListFn();
                        this.visible = false;
                    });
                } else {
                    message.error(data.msg, 1);
                }
            },
            async updateBannerClassFn (params) {
                const data = await updateBannerClass(params);
                if (data.code == '200') {
                    message.success(data.msg, 1, () => {
                        this.getBannerClassListFn();
                        this.visible = false;
                    });
                } else {
                    message.error(data.msg, 1);
                }
            },
        }
    }
</script>