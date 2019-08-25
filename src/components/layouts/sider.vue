<template>
	<div>
		<a-menu
			:defaultSelectedKeys="defaultSelectedKeys"
			:defaultOpenKeys="defaultOpenKeys"
			:openKeys="openKeys"
			mode="inline"
			theme="dark"
			:inlineCollapsed="collapsed"
			@openChange="onOpenMenu"
		>
			<template v-for="item in menus">
				<template v-if="!item.subs">
					<a-menu-item :key="item.key">
						<router-link v-if="item.path" :to="item.path">
							<a-icon v-if="item.icon" :type="item.icon" />
							<span>{{item.name}}</span>
						</router-link>
						<a v-else href="javascript:;">
							<a-icon v-if="item.icon" :type="item.icon" />
							<span>{{item.name}}</span>
						</a>
					</a-menu-item>
				</template>

				<template v-else>
					<!-- 包含二级分类 -->
					<a-sub-menu :key="item.key">
						<span slot="title">
							<a-icon v-if="item.icon" :type="item.icon" />
							<span>{{item.name}}</span>
						</span>
						<template v-for="second in item.subs">
							<template v-if="!second.subs">
								<a-menu-item :key="second.key">
									<router-link v-if="second.path" :to="second.path">
										<a-icon v-if="second.icon" :type="second.icon" />
										<span>{{second.name}}</span>
									</router-link>
									<a v-else href="javascript:;">
										<a-icon v-if="second.icon" :type="second.icon" />
										<span>{{second.name}}</span>
									</a>
								</a-menu-item>
							</template>
							<!-- 包含三级分类 -->
							<template v-else>
								<a-sub-menu :key="second.key" :title="second.name">
									<template v-for="third in second.subs">
										<a-menu-item :key="third.key">
											<router-link v-if="third.path" :to="third.path">
												<a-icon v-if="third.icon" :type="third.icon" />
												<span>{{third.name}}</span>
											</router-link>
											<a v-else href="javascript:;">
												<a-icon v-if="third.icon" :type="third.icon" />
												<span>{{third.name}}</span>
											</a>
										</a-menu-item>
									</template>
								</a-sub-menu>
							</template>
						</template>
					</a-sub-menu>
				</template>
			</template>
		</a-menu>
	</div>
</template>
<script>
	const menus = [
		{
			key: 'index',
			name: '站点首页',
			icon: 'setting',
			path: '/admin/index',
		},
		{
			key: 'siteinfo',
			name: '站点设置',
			icon: 'setting',
			path: '',
			subs: [
				{
					key: 'siteinfo-site',
					name: '基本设置',
					icon: '',
					path: '/admin/siteinfo/site'
				},
				{
					key: 'siteinfo-banner',
					name: '幻灯片管理',
					icon: '',
					path: '/admin/siteinfo/banner'
				},
				{
					key: 'siteinfo-upload',
					name: '上传设置',
					icon: '',
					path: '/admin/siteinfo/upload'
				},
			],
		},
		{
			key: 'member',
			name: '会员管理',
			icon: 'user',
			path: '',
			subs: [
				{
					key: 'member-index',
					name: '会员列表',
					icon: '',
					path: '/admin/member/index'
				},
			]
		},
		{
			key: 'list',
			name: '表格列表',
			icon: 'pie-chart',
			path: '/admin/list/1'
		},
		{
			key: 'piclist',
			name: 'PicList',
			icon: 'desktop',
			path: '/admin/piclist/2'
		},
		{
			key: 'first1',
			name: '一级分类',
			icon: 'setting',
			path: '',
			subs: [
				{
					key: 'second1',
					name: '二级分类',
					icon: '',
					path: ''
				},
				{
					key: 'second2',
					name: '二级分类',
					icon: '',
					path: '',
					subs: [
						{
							key: 'third1',
							name: '三级分类',
							icon: '',
							path: ''
						}
					]
				}
			]
		},
		{
			key: 'assets',
			name: '资源管理',
			icon: 'setting',
			path: '/admin/assets',
		},
		{
			key: 'account',
			name: '账号管理',
			icon: 'setting',
			path: '',
			subs: [
				{
					key: 'account-index',
					name: '管理员列表',
					icon: '',
					path: '/admin/account/index'
				},
				{
					key: 'account-permisson',
					name: '权限管理',
					icon: '',
					path: '/admin/account/permisson'
				},
			]
		},
		{
			key: 'user',
			name: '个人设置',
			icon: 'user',
			path: '',
			subs: [
				{
					key: 'user-userinfo',
					name: '编辑资料',
					icon: '',
					path: '/admin/user/userinfo'
				},
				{
					key: 'user-changepass',
					name: '修改密码',
					icon: '',
					path: '/admin/user/changepass'
				},
				{
					key: 'account-logout',
					name: '退出登陆',
					icon: '',
					path: ''
				},
			]
		},
	];

	export default {
		name: 'SiderComponent',
		props: {
			collapsed: {
				type: Boolean,
				default: function () {
					return false
				}
			}
		},
		data() {
			return {
				menus,
				defaultOpenKeys: [],
				openKeys: [],
				defaultSelectedKeys: ['index']
			};
		},
		mounted() {
			// console.log('router info:', this.$route);
		},
		methods: {
			onOpenMenu (openKeys) {
				const latestOpenKey = openKeys.length && openKeys.find(key => this.openKeys.indexOf(key) === -1);
				// console.log('latestOpenKey', latestOpenKey);
				this.openKeys = [latestOpenKey] || [];
			},
		}
	};
</script>
<style scoped>
	.ant-menu-submenu,
	.ant-menu-item {
		text-align: left;
	}
</style>
