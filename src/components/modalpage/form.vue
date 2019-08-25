<template>
    <div>
        <a-modal :visible="visible" :maskClosable="false" @ok="() => {$emit('ok')}" @cancel="() => {$emit('cancel')}">
            <div class="modal-form_header">
                <div class="modal-form_header_title">{{modalTitle}}</div>
            </div>
            <a-form layout="vertical" :form="form">
                <slot></slot>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: 'ModalForm',
    props: {
        visible: {
            type: Boolean,
            default: function () {
                return false;
            }
        },
        modalTitle: {
            type: String,
        },
        action : {
            type: String,
            default: function () {
                return '';
            }
        },
        editId: {
            type: String,
        }
    },
    beforeCreate () {
        this.form = this.$form.createForm(this);
    },
}
</script>
<style scoped>
.modal-form_header {
    position: relative;
    top: -7px;
    text-align: center;
}
.modal-form_header_title {
    font-size: 18px;
    line-height: 2;
}
</style>