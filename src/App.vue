<template>
    <div id="app">
		<a-locale-provider :locale="LAN">
			<a-spin :spinning="spinning">
				<a-back-top />
        		<router-view></router-view>
			</a-spin>	
		</a-locale-provider>
    </div>
</template>
<script>
import { mapState } from 'vuex';

// import moment from 'moment';
// import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

export default {
	name: 'App',
	data () {
		return {
			// zh_CN,
			spinning: true
		}
	},
	computed: {
		...mapState({
			LAN: state => state.localeStore.LAN,
		})
	},
	created () {
		// console.log('store', this.$store)
	},
	mounted () {
		this.spinning = false;
	}
}
</script>
<style scoped>
    #app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 14px;
		color: #2c3e50;
	}
</style>