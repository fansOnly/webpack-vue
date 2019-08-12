<template>
  <div class>
    <!-- <div class="page" :style="{height:getWindowHeight}"> -->
    <div class="page">
      <Sider class="sidebar" v-model="collapsed">
        <div class="logo-wrap">
          <img class="logo" src="../../assets/images/antd.svg" alt='' />
          <h1>Ant Design Pro</h1>
        </div>
        <SiderComponent />
      </Sider>
      <Layout class="main">
        <Header>
          <HeaderComponent :collapsed="collapsed" @onToggleCollapsed="toggleCollapsed" />
        </Header>
        <Content>
          <ContainerComponent />
          </Content>
        <Footer>
          <FooterComponent />
        </Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import { Layout } from 'ant-design-vue';

import SiderComponent from '@/components/layouts/sider.vue';
import HeaderComponent from '@/components/layouts/header.vue';
import FooterComponent from '@/components/layouts/footer.vue';
import ContainerComponent from '@/components/layouts/container.vue';

const { Header, Sider, Content, Footer } = Layout;

export default {
  name: 'Index',
  components: {
    Layout,
    Header,
    Content,
    Sider,
    Footer,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    SiderComponent,
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
    },
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
