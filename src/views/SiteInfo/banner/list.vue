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
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="bannerList" :pagination="pagination" bordered >
                <span slot="imagex" slot-scope="action">
                    <span v-if="!action.length">暂无</span>
                    <a v-else href="javascript:;" @click="handlePhotoPreview(action[0])"><img :src="action[0].url" style="width:50px;height:50px;" alt=""></a>
                </span>
                <span slot="actionx" slot-scope="action, record, index">
                    <a @click="showModal('edit', record.id)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(index)">
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
            <!-- banner新增/修改弹窗 -->
            <ModalForm ref="banner" v-slot="{ form }" :visible="visible" :action="action" :modalTitle="modalTitle" @cancel="handleCancel" @ok="handleSubmit">
                <a-form-item v-if="action == 'edit'" label="幻灯片ID">
                    <a-input v-decorator="['id', {initialValue: initialBanner.id}]" disabled />
                </a-form-item>
                <a-form-item label="幻灯片名称">
                    <a-input v-decorator="['title', {rules: [{required: true,}], initialValue: initialBanner.title || ''}]" />
                </a-form-item>
                <a-form-item >
                    <span slot="label">幻灯片图片<span style="color:rgba(0,0,0,0.45);font-size:13px;">(只能上传jpg,png,gif,mp4)</span></span>
                    <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        v-decorator="['imageList', {rules: [{required: true, validator: validateImage},], initialValue: imageList.length && imageList[0].url}]"
                        :beforeUpload="beforeUpload"
                        @preview="handlePhotoPreview"
                        @change="handlePhotoChange"
                    >
                        <div v-if="imageList.length == 0">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>
                </a-form-item>
                <a-form-item label="幻灯片链接">
                    <a-input v-decorator="['url', {initialValue: initialBanner.url || ''}]" />
                </a-form-item>
                <a-form-item label="幻灯片描述">
                    <a-input v-decorator="['content', {initialValue: initialBanner.content || ''}]" />
                </a-form-item>
            </ModalForm>
            <a-modal :visible="photoPreviewVisible" :footer="null" @cancel="handlePhotopreviewCancel">
                <img alt="" style="width: 100%" :src="previewPhoto" />
            </a-modal>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';
    import ModalForm from '@/components/modalpage/form.vue';

    import { message } from 'ant-design-vue';

    import { getBannerList, addBanner, getBannerDetail, updateBanner } from '@/api/banner';

    const columns = [
        {
			title: '幻灯片ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '幻灯片名称',
			dataIndex: 'title',
        },
        {
			title: '幻灯片描述',
			dataIndex: 'content',
        },
        {
			title: '幻灯片链接',
			dataIndex: 'url',
        },
        {
			title: '幻灯片图片',
            dataIndex: 'image',
            scopedSlots: {customRender: 'imagex'}
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
			width: '120px'
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
                bannerList: [],
                columns,
                pagination: false,
                loading: true,
                visible: false,
                modalTitle: '',
                action: '',
                initialBanner: {},
                photoPreviewVisible: false,
                previewPhoto: '',
                imageList: [],
            }
        },
        created () {
            this.classid = this.$route.params.classid;
            this.getBannerListFn();
        },
        methods: {
            delItem(index) {
				console.log(`删除第 ${index} 项`);
				this.dataSource.splice(index, 1);
            },
            handlePhotopreviewCancel() {
				this.photoPreviewVisible = false;
            },
			handlePhotoPreview(file) {
                this.previewPhoto = file.url || file.thumbUrl;
				this.photoPreviewVisible = true;
            },
            beforeUpload (file, fileList) {
                // console.log('beforeUpload', file, fileList);
                let imageArr = [];
                fileList.length && fileList.map(item => {
                    item.status == 'done' && imageArr.push({name: item.name, size: item.size, type: item.type})
                })
                this.imageList = imageArr;
                // return false;
            },
			handlePhotoChange({ fileList }) {
                console.log('handlePhotoChange', fileList);
                let imageArr = [];
                fileList.length && fileList.map(item => {
                    item.status == 'done' && imageArr.push({url: item.response.url, name: item.name, size: item.size, type: item.type})
                })
                this.imageList = imageArr;
            },
            validateImage (rule, value, callback) {
                console.log('validateImage', rule,  value)
                if (!value || !value.fileList.length) {
                    callback(new Error('请上传幻灯片图片'));
                } else {
                    callback();
                }
            },
            showModal (action, editId) {
                if (action == 'add') {
                    this.action = action;
                    this.modalTitle = '新增幻灯片';
                    this.visible = true;
                } else if (action == 'edit') {
                    this.editId = editId;
                    this.action = action;
                    this.modalTitle = '编辑幻灯片';
                    this.getBannerDetailFn();
                } else {
                    message.error('非法操作');
                }
            },
            handleCancel () {
                this.resetFormData();
                this.visible = false;
            },
            handleSubmit () {
                const form = this.$refs.banner.form;
                console.log('form.isFieldsTouched()', form.isFieldsTouched());
                form.validateFields((err, values) => {
                    if (!err) {
                        console.log('form values: ', values);
                        if (form.isFieldsTouched()) {
                            // 处理参数
                            values.classid = this.classid;
                            delete values.imageList;
                            values.image = this.imageList;
                            if (this.action == 'add') {
                                this.addBannerFn(values);
                            }
                            if(this.action == 'edit') {
                                this.updateBannerFn(values);
                            }
                        } else {
                            this.handleCancel();
                        }
                    }
                })
            },
            resetFormData () {
                this.initialBanner = {};
                this.imageList = [];
                const form = this.$refs.banner.form;
                form.resetFields();
            },
            // api
            async getBannerListFn () {
                const data = await getBannerList({classid: this.classid});
				this.loading = false;
                this.bannerList = data.data;

                this.resetFormData();
            },
            async getBannerDetailFn () {
                const data = await getBannerDetail({id: this.editId})
                if (data.code == '200') {
                    this.initialBanner = data.data;
                    this.imageList = data.data.image;
                    console.log('getBannerDetailFn', this.imageList);
                    this.visible = true;
                }
            },
            async addBannerFn (params) {
                const data = await addBanner(params);
                if (data.code == '200') {
                    message.success(data.msg, 1, () => {
                        // const form = this.$refs.banner.form;
                        // form.resetFields();
                        this.visible = false;
                        this.getBannerListFn();
                    });
                } else {
                    message.error(data.msg, 1);
                }
            },
            async updateBannerFn (params) {
                const data = await updateBanner(params);
                if (data.code == '200') {
                    message.success(data.msg, 1, () => {
                        // const form = this.$refs.banner.form;
                        // form.resetFields();
                        this.visible = false;
                        this.getBannerListFn();
                    });
                } else {
                    message.error(data.msg, 1);
                }
            },
        }
    }
</script>