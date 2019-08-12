<template>
  <div>
    <Menu
      :defaultSelectedKeys="['setting']"
      :defaultOpenKeys="['']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
      @click="openMenu"
    >
    <template v-for="item in menus">
    
        <template v-if="!item.subs">
            <MenuItem :key="item.key">
              <router-link v-if="item.url" :to="item.url">
                <Icon v-if="item.icon" :type="item.icon" />
                <span>{{item.name}}</span>
              </router-link>
              <a v-else href="javascript:;">
                <Icon v-if="item.icon" :type="item.icon" />
                <span>{{item.name}}</span>
              </a>
            </MenuItem>
        </template>

        <template v-else>
              <!-- 包含二级分类 -->
            <SubMenu :key="item.key">
              <span slot="title">
                <Icon v-if="item.icon" :type="item.icon" />
                <span>{{item.name}}</span>
              </span>
              <template v-for="second in item.subs">
                <template v-if="!second.subs">
                  <MenuItem :key="second.key">{{second.name}}</MenuItem>
                </template>
                <!-- 包含三级分类 -->
                <template v-else>
                  <SubMenu :key="second.key" :title="second.name">
                      <template v-for="third in second.subs">
                        <MenuItem :key="third.key">{{third.name}}</MenuItem>
                        </template>
                  </SubMenu>
                </template>
              </template>
            </SubMenu>
        </template>

      </template>

    </Menu>
  </div>
</template>
<script>
import { Menu, Icon } from 'ant-design-vue';

const { SubMenu, Item } = Menu;

const menus = [
  {
    key: 'setting',
    name: '基本设置',
    icon: 'setting',
    url: '/admin/index',
  },
  {
    key: 'list',
    name: '表格列表',
    icon: 'pie-chart',
    url: '/admin/list/1',
  },
  {
    key: 'piclist',
    name: 'PicList',
    icon: 'desktop',
    url: '/admin/piclist/2',
  },
  {
    key: 'first1',
    name: '一级分类',
    icon: 'setting',
    url: '',
    subs: [
      {
        key: 'second1',
        name: '二级分类',
        icon: '',
        url: '/admin/piclist',
      },
      {
        key: 'second2',
        name: 'PicList',
        icon: '',
        url: '',
        subs: [
          {
            key: 'third1',
            name: '三级分类',
            icon: '',
            url: '/admin/piclist',
          },
        ]
      }
    ]
  },
];

export default {
  name: 'SiderComponent',
  props: ['collapsed'],
  components: {
    Menu,
    MenuItem: Item,
    SubMenu,
    Icon
  },
  data () {
    return {
      menus,
    }
  },
  mounted () {
    // console.log('router info:', this.$route);
  },
  methods: {
    openMenu (item) {
      console.log('openMenu', item)
    }
  }
};
</script>
<style scoped>
.ant-menu-submenu,
.ant-menu-item {
  text-align: left;
}
</style>
