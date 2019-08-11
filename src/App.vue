<template>
    <div id="app">
		<LocaleProvider :locale="LAN">
        	<router-view></router-view>
		</LocaleProvider>
    </div>
</template>
<script>
import { LocaleProvider } from 'ant-design-vue';
import { mapState } from 'vuex';

// import moment from 'moment';
// import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

export default {
	name: 'App',
	components: {
		LocaleProvider,
	},
	data () {
		return {
			// zh_CN,
		}
	},
	computed: {
		...mapState({
			LAN: state => state.locale.LAN,
		})
	},
	created () {
		// console.log('store', this.$store)
	}
}
</script>
<style scoped>
    #app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>