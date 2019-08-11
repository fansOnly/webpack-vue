<template>
  <div>
    <Form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <Row :gutter="24">
        <Col v-for="(item, index) in conditions" :key="item.key" :span="6" :style="{ display: index < count ? 'block' : 'none' }" >
          <FormItem :label="item.name">
            <Input
              v-decorator="[
                item.key,
                {
                  rules: [{
                    message: 'Input something!',
                  }],
                }
              ]"
              placeholder="placeholder"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="24" :style="{ textAlign: 'right' }" >
          <Button type="primary" html-type="submit">搜索</Button>
          <Button :style="{ marginLeft: '8px' }" @click="handleReset">重置</Button>
          <a v-if="conditions.length > 4" :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            {{expand ? '收起' : '展开'}}
            <Icon :type="expand ? 'up' : 'down'" />
          </a>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import { Button, Form, Row, Col, Input, Icon } from 'ant-design-vue';

const conditions = [
    {
        key: 'title',
        name: '标题',
    },
    {
        key: 'admin',
        name: '发布人'
    },
    {
        key: 'createTime',
        name: '创建时间'
    },
    {
        key: 'state',
        name: '状态'
    }
];

export default {
  name: 'filterBarComponent',
  components: {
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    Row,
    Col,
    Icon,
  },
  data() {
    return {
        conditions,
      form: this.$form.createForm(this),
      expand: false
    };
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    }
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
    }
  }
};
</script>
<style scoped>
.ant-advanced-search-form {
    margin-bottom: 24px;
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-label {
    min-width: 120px;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
  width: 100%;
}
</style>
