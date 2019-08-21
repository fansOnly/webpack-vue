<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
			<a-form :form="form" layout="vertical" @submit="handleSubmit">
				<a-row :gutter="50">
					<a-col :span="12">
						<a-form-item label="原密码" hasFeedback>
							<a-input v-decorator="['oldPass',{rules: [{validator: validateOldPass, trigger: ['blur']}]}]" type="password" />
						</a-form-item>
						<a-form-item label="新密码" hasFeedback>
							<a-input v-decorator="['newPass',{rules: [{validator: compareOldAndNew, trigger: ['change', 'blur']}]}]" type="password" />
						</a-form-item>
                        <a-form-item label="确认密码" hasFeedback>
							<a-input v-decorator="['newPass2',{rules: [{validator: compareNewAndNew2, trigger: ['change', 'blur']}]}]" type="password" />
						</a-form-item>
                        <a-button type='primary' html-type='submit'>保存</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

	export default {
		name: 'ChangePass',
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
            validateOldPass (rule, value, callback) {
                if (!value) {
                    callback(new Error('请输入原始密码'));
                } else if (value !== '123456') {
                    callback(new Error('原始密码输入错误'));
                } else {
                    callback()
                }
            },
            compareOldAndNew (rule, value, callback) {
                if (!value) {
                    callback(new Error('请输入新的密码'));
                } else if (value == this.form.getFieldValue('oldPass')) {
                    callback(new Error('新密码不能与原密码一致'));
                } else {
                    callback()
                }
            },
            compareNewAndNew2 (rule, value, callback) {
                if (!value) {
                    callback(new Error('请输入新的确认密码'));
                } else if (value != this.form.getFieldValue('newPass')) {
                    callback(new Error('两次输入的新密码不一致'));
                } else {
                    callback()
                }
            }
        }
	};
</script>