<template>
    <div>
        <BreadCrumbComponent />
        this is a edit page...
    </div>
</template>
<script>
import { Input } from 'ant-design-vue';
import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

export default {
    name: 'EditComponent',
    components: {
        BreadCrumbComponent,
    },
    date () {
        return {
            id: 0,
            detail: {}
        }
    },
    mounted () {
        // console.log('edit-page-router:', this.$route);
        this.id = this.$route.params.id;
    },
    methods: {},
}
</script>
<style scoped>
    
</style>