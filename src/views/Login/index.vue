<template>
  <div>
    <img alt="Vue logo" src="../../assets/images/logo.png" style="width:100px;height:auto;" />
    <p class="s1">this is page Home.....</p>
    <router-link to="/admin">go to user</router-link>
    <p>
      <input type="text" v-model="value" placeholder="请输入数字" @input="type" />
    </p>
    <p>输入的值为：{{value2}}</p>
  </div>
</template>

<script>
import Tools from '@/utils/Tools';
export default {
  name: 'HomeIndex',
  data() {
    return {
      value: '',
      value2: ''
    };
  },
  methods: {
    type(e) {
      console.log('typing', e, this.value);
      this.value2 = Tools.formateNumber(this.value, ',');
    }
  }
};
</script>
<style scoped>
.s1 {
  color: red;
  font-size: 40px;
}
</style>
