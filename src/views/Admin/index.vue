<template>
	<div class>
		<!-- <div class="page" :style="{height:getWindowHeight}"> -->
		<div class="page">
			<a-layout-sider class="sidebar" v-model="collapsed">
				<div class="logo-wrap">
					<img class="logo" src="../../assets/images/antd.svg" alt />
					<h1>Ant Design Pro</h1>
				</div>
				<SiderComponent />
			</a-layout-sider>
			<a-layout class="main">
				<a-layout-header>
					<HeaderComponent :collapsed="collapsed" @onToggleCollapsed="toggleCollapsed" />
				</a-layout-header>
				<a-layout-content>
					<ContainerComponent />
				</a-layout-content>
				<a-layout-footer>
					<FooterComponent />
				</a-layout-footer>
			</a-layout>
		</div>
	</div>
</template>

<script>
	import SiderComponent from '@/components/layouts/sider.vue';
	import HeaderComponent from '@/components/layouts/header.vue';
	import FooterComponent from '@/components/layouts/footer.vue';
	import ContainerComponent from '@/components/layouts/container.vue';

	export default {
		name: 'Index',
		components: {
			HeaderComponent,
			FooterComponent,
			ContainerComponent,
			SiderComponent
		},
		data() {
			return {
				windowHeight: 0,
				collapsed: false
			};
		},
		computed: {
			getWindowHeight: function() {
				return window.screen.availHeight + 'px';
				// return document.documentElement.clientHeight + 'px';
			}
		},
		methods: {
			toggleCollapsed(collapsed) {
				this.collapsed = collapsed;
			}
		}
	};
</script>
<style scoped>
	@import "./index.css";
</style>
