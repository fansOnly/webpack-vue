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
                const FIELDS = [
                    ['name', 'phone', 'email', 'content'],
                    [],
                    ['seo_title', 'seo_keyword', 'seo_desc']
                ];
                const fields = FIELDS[this.tabActiveKey-1];
                this.form.validateFields(fields, (errors, values) => {
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