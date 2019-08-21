<template>
    <div :style="{minHeight:getContainerHeight}">
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    name: 'ContainerComponent',
    computed: {
        getContainerHeight: function() {
            // return window.screen.availHeight - 64 - 48 - 69 + 'px';
            return document.documentElement.clientHeight - 64 - 24 - 69 + 'px';
        }
    },
}
</script>
<style scoped>
@import './index.css';
</style>