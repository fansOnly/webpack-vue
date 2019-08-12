<template>
  <div>
    <Form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <Row :gutter="24">
        <Col
          v-for="(item, index) in conditions"
          :key="item.key"
          :span="6"
          :style="{ display: index < count ? 'block' : 'none' }"
        >
          <FormItem :label="item.name">
            <template v-if="item.type == 'text'">
            <Input
              v-decorator="[
                item.key,
                {
                  rules: [{
                    message: item.placeholder,
                  }],
                }
              ]"
              :placeholder="item.placeholder"
            /></template>
            <template v-if="item.type == 'date'">
            <DatePicker
              v-decorator="[
                item.key,
                {
                  rules: [{
                    required: false,
                    message: item.placeholder,
                  }],
                }
              ]"
              :placeholder="item.placeholder"
            />
            </template>
            <template v-if="item.type == 'select'">
              <Select v-decorator="[
                item.key,
                {
                  rules: [{
                    required: false,
                    message: item.placeholder,
                  }],
                  initialValue: item.list[0].value,
                }
              ]" >
                <template v-for="(select, index) in item.list">
                <SelectOption :key="index" :value="select.value">{{select.name}}</SelectOption>
                </template>
              </Select>
            </template>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="24" :style="{ textAlign: 'right' }">
          <Button type="primary" html-type="submit">搜索</Button>
          <Button :style="{ marginLeft: '8px' }" @click="handleReset">重置</Button>
          <a
            v-if="conditions.length > 4"
            :style="{ marginLeft: '8px', fontSize: '12px' }"
            @click="toggle"
          >
            {{expand ? '收起' : '展开'}}
            <Icon :type="expand ? 'up' : 'down'" />
          </a>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Icon,
  DatePicker,
  Select,
} from 'ant-design-vue';

const conditions = [
  {
    key: 'title',
    name: '标题',
    placeholder: '请输入关键字',
    type: 'text'
  },
  {
    key: 'admin',
    name: '发布人',
    placeholder: '请输入关键字',
    type: 'text'
  },
  {
    key: 'publishdate',
    name: '创建时间',
    placeholder: '请选择发布日期',
    type: 'date'
  },
  {
    key: 'state',
    name: '状态',
    placeholder: '请选择状态',
    type: 'select',
    list: [{
      name: '全部',
      value: ''
    },{
      name: '已下架',
      value: 0
    },{
      name: '待审核',
      value: 1
    },{
      name: '已审核',
      value: 2
    },{
      name: '已置顶',
      value: 3
    }]
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
    DatePicker,
    Select,
    SelectOption: Select.Option,
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
      this.form.validateFields((error, fieldsValue) => {
        if (error) {
          console.log('error', error);
          return;
        }
        const values = {
          ...fieldsValue,
          publishdate: fieldsValue['publishdate'] && fieldsValue['publishdate'].format('YYYY-MM-DD'),
        }
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
@import "./index.css";
</style>
