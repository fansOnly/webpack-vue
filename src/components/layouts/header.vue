<template>
  <div class="header">
    <div class="header-left">
      <Icon
        @click="onToggleCollapsed"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        style="color:#777;font-size:28px;vertical-align:middle;cursor:pointer;"
      />
    </div>
    <div class="header-right">
      <div class="search">
        <Search placeholder="input search text" @search="handleSearch" enterButton />
      </div>
      <div class="notice">
        <Badge dot><Icon type="bell" style="color:#777;font-size:20px;vertical-align:middle;cursor:pointer;" /></Badge>
      </div>
      <div>
        <Dropdown overlayClassName="user-options" placement="topRight">
            <div class="user-opt"><Avatar icon="user" /><span style="margin-left:10px;text-transform:uppercase;">admin</span></div>
              <Menu slot="overlay" @click="handleUserMenuClick">
                <MenuItem key="user.edit"><router-link to=""><Icon type="user" style="margin-right:5px;" />修改资料</router-link></MenuItem>
                <MenuItem key="user.pass"><router-link to=""><Icon type="setting" style="margin-right:5px;" />修改密码</router-link></MenuItem>
                <MenuDivider />
                <MenuItem key="user.logout"><a href="javascript:;"><Icon type="poweroff" style="margin-right:5px;" />退出登录</a></MenuItem>
              </Menu>
        </Dropdown>
        </div>
        <div>
            <Dropdown overlayClassName="user-options" placement="topRight">
                <div class="language"><Icon type="global" style="color:#777;font-size:20px;vertical-align:middle;cursor:pointer;" /></div>
                <Menu slot="overlay" @click="handleLanrMenuClick">
                  <template v-for="item in locales">
                    <MenuItem :key="item"><a href="javascript:;">{{languageIcons[item]}} {{languageLabels[item]}}</a></MenuItem>
                    </template>
                </Menu>
            </Dropdown>
        </div>
    </div>
  </div>
</template>

<script>
import { Icon, Input, Dropdown, Menu, Avatar, Badge } from 'ant-design-vue';
import { mapState, mapActions } from 'vuex';

const { Search } = Input;
const { Item, Divider } = Menu;

const locales = ['zh_CN', 'zh_TW', 'en_US'];
const languageLabels = {
  'zh_CN': '简体中文',
  'zh_TW': '繁体中文',
  'en_US': 'English',
};
const languageIcons = {
  'zh_CN': '🇨🇳',
  'zh_TW': '🇭🇰',
  'en_US': '🇬🇧',
};

export default {
  name: 'HeaderComponent',
  props: ['collapsed'],
  components: {
    Icon,
    Search,
    Dropdown,
    Menu,
    MenuItem: Item,
    MenuDivider: Divider,
    Avatar,
    Badge,
  },
  data () {
      return {
        locales,
        languageLabels,
        languageIcons,
      }
  },
  computed: {
    ...mapState({
      locale: state => state.locale.locale
    })
  },
  mounted() {},
  methods: {
    ...mapActions({
      // 'locale': []
    }),
    onToggleCollapsed () {
      this.$emit('onToggleCollapsed', !this.collapsed);
    },
    handleSearch (value) {
      console.log(`search for ${value}`);
    },
    handleUserOption (value) {
        console.log(`selected ${value}`);
    },
    handleUserMenuClick (item) {
      if (item.key == 'user.logout') {
        console.log('logout...')
      }
    },
    handleLanrMenuClick (item) {
      // console.log('handleLanrMenuClick', item);
      console.log(`当前选择语言为: ${item.key} ${languageLabels[item.key]}`);
      this.$store.dispatch('locale/setLocale', item.key);
    }
  }
};
</script>
<style>
@import "./index.css";
</style>
