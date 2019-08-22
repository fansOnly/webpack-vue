<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
			<a-form :form="form" layout="vertical" @submit="handleSubmit">
				<a-row :gutter="24">
					<a-col :span="16">
						<a-form-item label="最大同时上传文件数">
							<a-input v-decorator="['max_files']" />
							<span slot="extra" class="help-block">多文件上传时,用户能最大同时上传文件数,默认20个</span>
						</a-form-item>
						<a-form-item label="文件分块上传分块大小">
							<a-input v-decorator="['chunk_size']" />
							<span slot="extra" class="help-block">文件上传采用分块上传,文件分块大小默认512KB,可以根据服务器最大上传限制设置此数值</span>
						</a-form-item>
						<a-form-item label="图片文件">
							<a-row :gutter="24">
								<a-col :span="12"><a-form-item><a-input v-decorator="['file_types[image][upload_max_filesize]']" /></a-form-item></a-col>
								<a-col :span="12"><a-form-item><a-input v-decorator="['file_types[image][extensions]']" /></a-form-item></a-col>
							</a-row>
							<span slot="extra" class="help-block">允许上传大小默认为10240KB,1M=1024KB，允许上传格式默认为jpg,jpeg,png,gif,bmp</span>
						</a-form-item>
						<a-form-item label="视频文件">
							<a-row :gutter="24">
								<a-col :span="12"><a-form-item><a-input v-decorator="['file_types[video][upload_max_filesize]']" /></a-form-item></a-col>
								<a-col :span="12"><a-form-item><a-input v-decorator="['file_types[video][extensions]']" /></a-form-item></a-col>
							</a-row>
							<span slot="extra" class="help-block">允许上传大小默认为10240KB,1M=1024KB，允许上传格式默认为mp4,avi,wmv,rm,rmvb,mkv</span>
						</a-form-item>
						<a-form-item label="音频文件">
							<a-row :gutter="24">
								<a-col :span="12"><a-form-item><a-input v-decorator="['file_types[audio][upload_max_filesize]']" /></a-form-item></a-col>
								<a-col :span="12"><a-form-item><a-input v-decorator="['file_types[audio][extensions]']" /></a-form-item></a-col>
							</a-row>
							<span slot="extra" class="help-block">允许上传大小默认为10240KB,1M=1024KB，允许上传格式默认为mp3,wma,wav</span>
						</a-form-item>
						<a-form-item label="附件">
							<a-row :gutter="24">
								<a-col :span="12"><a-form-item><a-input v-decorator="['file_types[file][upload_max_filesize]']" /></a-form-item></a-col>
								<a-col :span="12"><a-form-item><a-input v-decorator="['file_types[file][extensions]']" /></a-form-item></a-col>
							</a-row>
							<span slot="extra" class="help-block">允许上传大小默认为10240KB,1M=1024KB，允许上传格式默认为除以上文档类型以外的其它常用文件,如：txt,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar</span>
						</a-form-item>
						<a-button type="primary" html-type="submit">保存</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
	</div>
</template>

<script>
	import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

	export default {
		name: 'UploadSetting',
		components: {
			BreadCrumbComponent
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((errors, values) => {
                    if (!errors) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        },
	};
</script>
<style scoped>
.help-block {
	display: block;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #597ea2;
}
.ant-form-vertical .ant-btn {
	margin-top: 0;
}
</style>