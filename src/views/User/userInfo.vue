<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
			<a-form :form="form" layout="vertical" @submit="handleSubmit">
				<a-row :gutter="50">
					<a-col :span="12">
						<a-form-item label="昵称">
							<a-input v-decorator="['nickname',{rules: [{required: true, whitespace:true}]}]" />
						</a-form-item>
						<a-form-item label="手机">
							<a-input v-decorator="['phone',{rules: [{required: true, pattern: /^1[3456789]\d{9}$/, message: '错误的手机号码'}]}]" >
                                <a-select slot="addonBefore" v-decorator="[ 'prefix', { initialValue: '86' }]" style="width: 70px" >
                                    <a-select-option value="86">+86</a-select-option>
                                    <a-select-option value="87">+87</a-select-option>
                                </a-select>
							</a-input>
						</a-form-item>
                        <a-form-item label="邮箱">
							<a-input v-decorator="['email',{rules: [{type: 'email', message: '错误的邮箱格式'}]}]" />
						</a-form-item>
                        <a-form-item label="备注">
							<a-textarea v-decorator="['content']" :rows="4" />
						</a-form-item>
                        <a-button type='primary' html-type='submit'>保存</a-button>
                        <a-button html-type='reset'>重置</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

	export default {
		name: 'UserInfo',
		components: {
			BreadCrumbComponent,
		},
		data() {
			return {};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        }
	};
</script>