<template>
    <div class="footer">
        Copyright
        <Icon type='copyright' style="padding:0 8px;" />
        2019 蚂蚁金服体验技术部出品
    </div>
</template>
<script>
import { Icon } from 'ant-design-vue';
export default {
    name: 'FooterComponent',
    components: {
        Icon
    }
}
</script>
<style scoped>
    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>