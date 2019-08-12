<template>
    <div>
        <Spin tip='加载中...'>
            <div class="loading-mask"></div>
        </Spin>
    </div>
</template>
<script>
import { Spin } from 'ant-design-vue';

export default {
    name: 'LoadingComponent',
    components: {
        Spin
    }
}
</script>
<style scoped>
    .loading-mask {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        z-index: 999999;
    }
</style>