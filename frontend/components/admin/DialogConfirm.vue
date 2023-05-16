<template>
  <el-dialog
    v-model="centerDialogVisible"
    title="Warning"
    width="30%"
    align-center
  >
    <span>Open the dialog from the center from the screen</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
// import { ref, withDefaults, toRefs } from 'vue'

// interface Props {
//   isShow?: boolean;
// }

// const props = withDefaults(defineProps<Props>(), {
//   isShow: false
// })

// const { isShow } = toRefs(props)

// const isShowModal = ref<boolean>(isShow.value)
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
