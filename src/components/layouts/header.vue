<template>
	<div class="header">
		<div class="header-left">
			<a-icon
				@click="onToggleCollapsed"
				:type="collapsed ? 'menu-unfold' : 'menu-fold'"
				style="color:#777;font-size:28px;vertical-align:middle;cursor:pointer;"
			/>
		</div>
		<div class="header-right">
			<div class="search">
				<a-input-search placeholder="input search text" @search="handleSearch" enterButton />
			</div>
			<div class="notice">
				<a-badge dot>
					<a-icon type="bell" style="color:#777;font-size:20px;vertical-align:middle;cursor:pointer;" />
				</a-badge>
			</div>
			<div>
				<a-dropdown overlayClassName="user-options" placement="topRight">
					<div class="user-opt">
						<a-avatar icon="user" />
						<span style="margin-left:10px;text-transform:uppercase;">admin</span>
					</div>
					<a-menu slot="overlay" @click="switchUserOption">
						<a-menu-item key="user.userinfo">
							<router-link to='/admin/user/userinfo'>
								<a-icon type="user" style="margin-right:5px;" />修改资料
							</router-link>
						</a-menu-item>
						<a-menu-item key="user.changepass">
							<router-link to='/admin/user/changepass'>
								<a-icon type="setting" style="margin-right:5px;" />修改密码
							</router-link>
						</a-menu-item>
						<a-menu-divider />
						<a-menu-item key="user.logout">
							<a href="javascript:;">
								<a-icon type="poweroff" style="margin-right:5px;" />退出登录
							</a>
						</a-menu-item>
					</a-menu>
				</a-dropdown>
			</div>
			<div>
				<a-dropdown overlayClassName="language-options" placement="topRight">
					<div class="language">
						<a-icon
							type="global"
							style="color:#777;font-size:20px;vertical-align:middle;cursor:pointer;"
						/>
					</div>
					<a-menu slot="overlay" :defaultSelectedKeys="[locale]" @click="switchLocale">
						<template v-for="item in locales">
							<a-menu-item :key="item">
								<a href="javascript:;">{{languageIcons[item]}} {{languageLabels[item]}}</a>
							</a-menu-item>
						</template>
					</a-menu>
				</a-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
	import { message } from 'ant-design-vue';
	import { mapState, mapActions } from 'vuex';

	const locales = ['zh_CN', 'zh_TW', 'en_US'];
	const languageLabels = {
		zh_CN: '简体中文',
		zh_TW: '繁体中文',
		en_US: 'English'
	};
	const languageIcons = {
		zh_CN: '🇨🇳',
		zh_TW: '🇭🇰',
		en_US: '🇬🇧'
	};

	export default {
		name: 'HeaderComponent',
		props: {
			collapsed: {
				type: Boolean,
				default: function() {
					return false
				}
			}
		},
		data() {
			return {
				locales,
				languageLabels,
				languageIcons
			};
		},
		computed: {
			...mapState({
				locale: state => state.localeStore.locale
			})
		},
		mounted() {
			// console.log('locale', this.$store);
		},
		methods: {
			...mapActions({
				switchLocale: 'localeStore/switchLocale'
			}),
			onToggleCollapsed() {
				this.$emit('onToggleCollapsed', !this.collapsed);
			},
			handleSearch(value) {
				console.log(`search for ${value}`);
			},
			switchUserOption(item) {
				if (item.key == 'user.logout') {
					message.success('退出登陆', 1).then(() => {
						localStorage.clear();
						this.$router.push('/login');
					});
				}
			},
			// switchLocale(item) {
			//   // console.log('switchLocale', item);
			//   console.log(`当前选择语言为: ${item.key} ${languageLabels[item.key]}`);
			//   this.$store.dispatch('localeStore/switchLocale', item.key);
			//   // this.$store.dispatch(SWITCH_LOCAL, item.key);
			// }
		}
	};
</script>
<style>
	@import "./index.css";
</style>
