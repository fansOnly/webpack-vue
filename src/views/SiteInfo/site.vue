<template src="./site.html">

</template>

<script>
	import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

	export default {
		name: 'SiteSetting',
		components: {
			BreadCrumbComponent
        },
        data () {
            return {
                tabActiveKey: 1
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        created() {},
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                const allfFields = {
                    base: ['name', 'phone', 'email', 'content'],
                    advance: [],
                    seo: ['seo_title', 'seo_keyword', 'seo_desc'],
                    search: []
                };
                const currentFileds = allfFields[this.tabActiveKey];
                this.form.validateFields(currentFileds, (errors, values) => {
                    if (!errors) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
            handleTabChange (activeKey) {
                this.tabActiveKey = activeKey;
            }
        },
	};
</script>
<style scoped>
    .ant-form-vertical .ant-btn {
        margin-top: 0;
    }
</style>