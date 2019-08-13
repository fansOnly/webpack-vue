<template>
  <div>
    <BreadCrumbComponent />
    <div class="container">
      <Form :form="form" @change="handelSubmit">
        <Row>
          <Col :span="16">
            <FormItem label="序号" v-bind="formItemLayout">
              <Input
                v-decorator="[
                  'sortnum',
              ]"
                placeholder="请输入序号"
              />
            </FormItem>
            <FormItem v-bind="formItemLayout">
              <span slot="label">
                <Tooltip title="this is a tooltip.">
                  标题
                  <Icon type="info-circle" class="label-tip" />
                </Tooltip>
              </span>
              <Input
                v-decorator="[
                  'title',
                  {
                      rules: [{
                          required: true, message: '请输入标题！',
                      }]
                  }
              ]"
                placeholder="请输入标题"
              />
            </FormItem>
            <FormItem label="发布时间" v-bind="formItemLayout">
              <DatePicker
                v-decorator="['createTime', {
                rules: [{ type: 'object', required: true, message: '请选择发布时间' }],
              }]"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择发布时间"
                style="width:100%;"
              />
            </FormItem>
            <FormItem label="活动时间" v-bind="formItemLayout">
              <RangerPicker
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                :placeholder="['开始时间', '结束时间']"
                @change="onChange"
                @ok="onOk"
                style="width:100%;"
              />
            </FormItem>
            <FormItem label="简介" v-bind="formItemLayout">
              <TextArea
                v-decorator="[
                  'intro'
              ]"
                placeholder="请输入简介"
                :autosize="{ minRows: 2, maxRows: 4 }"
              />
            </FormItem>
            <FormItem label="内容" v-bind="formItemLayout">
              <TextArea
                v-decorator="[
                  'intro'
              ]"
                placeholder="请输入内容"
                :rows="8"
              />
            </FormItem>
            <FormItem
              v-bind="formItemLayout"
              label="附件"
              extra="只能上传jpg,png"
            >
              <Upload
                v-decorator="['upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                }]"
                name="files"
                action="/upload.do"
                list-type="picture"
              >
                <Button>
                  <Icon type="upload" />Click to upload
                </Button>
              </Upload>
            </FormItem>
            <FormItem :wrapper-col="{ span: 2, offset: 3 }">
              <Button type="primary" html-type="submit" block>保存</Button>
            </FormItem>
          </Col>
          <Col :span="7" :offset="1" style="background:#ccc;">
            <div>请输入序号请输入序号请输入序号请输入序号请输入序号请输入序号请输入序号请输入序号</div>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Icon,
  Tooltip,
  Button,
  Upload
} from 'ant-design-vue';
import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

export default {
  name: 'EditComponent',
  components: {
    BreadCrumbComponent,
    Form,
    FormItem: Form.Item,
    Input,
    Row,
    Col,
    DatePicker,
    RangerPicker: DatePicker.RangePicker,
    TextArea: Input.TextArea,
    Icon,
    Tooltip,
    Button,
    Upload
  },
  data() {
    return {
      id: 0,
      detail: {},
      formItemLayout: {
        labelCol: {
          sm: { span: 3 }
        },
        wrapperCol: {
          sm: { span: 21 }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    // console.log('edit-page-router:', this.$route);
    this.id = this.$route.params.id;
  },
  methods: {
    onChange(value, dateString) {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
    },
    onOk(value) {
      console.log('onOk: ', value);
    },
    normFile  (e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    handelSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>