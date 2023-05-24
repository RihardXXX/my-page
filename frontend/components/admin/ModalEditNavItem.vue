<template>
  <el-dialog v-model="isShowModal" title="Редактирование элемента меню">
    <el-form
      ref="formEditItem"
      label-position="top"
      :model="formEditNavItem"
      class="demo-ruleForm"
    >
      <el-form-item
        label="Выберите тип меню"
        prop="type"
        :rules="[ {
          required: true,
          message: 'пожалуйста выберите тип создаваемого элемента меню',
          trigger: 'change',
        },]"
      >
        <el-select v-model="formEditNavItem.type" placeholder="Выберите тип меню" :style="{width: '100%'}">
          <el-option label="меню со скроллом к секции" value="eventName" />
          <el-option label="меню переход на другую страницу в приложении" value="pageItem" />
          <el-option label="меню ссылка на сторонний ресурс" value="absolutLink" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="название меню"
        prop="name"
        :rules="[
          { required: true, message: 'поле обязательно для заполнения' },
          { type: 'string', message: 'заполните поле строкой' },
        ]"
      >
        <el-input
          v-model.number="formEditNavItem.name"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        :label="helpTextEdit"
        prop="nameSection"
        :rules="[
          { required: true, message: 'поле обязательно для заполнения' },
          { type: 'string', message: 'заполните поле строкой' },
        ]"
      >
        <el-input
          v-model.number="formEditNavItem.nameSection"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="openClose()">
          отмена
        </el-button>
        <el-button type="primary" @click="editMenuItemSave(formEditItem)">
          сохранить изменения
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, withDefaults, toRefs, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { useMutation } from '@vue/apollo-composable'
import { INavItemValidForm } from '~/interfaces'
import { generateHelpText } from '~/utils'
import { UPDATE_NAV_ITEM } from '~/apollo/mutation'

export interface PropsModalEditNavItem {
  openClose: () => void,
  updateItem: () => void,
  isShowModal: boolean,
  type?: string,
  name?: string,
  nameSection?: string,
}

const props = withDefaults(defineProps<PropsModalEditNavItem>(), {
  isShowModal: false,
  type: '',
  name: '',
  nameSection: ''
})

const { isShowModal, type, name, nameSection, openClose, updateItem } = toRefs(props)

console.log('name: 1123', name.value)

// форма для валидации ref for create item
const formEditItem = ref<FormInstance>()

// данные для редактирования в модалке
const formEditNavItem: INavItemValidForm = reactive({
  type: '',
  name: '',
  nameSection: ''
})

// подсказка для лейбла инпута при редактировании в модалке
const helpTextEdit = computed<string>(() => {
  return generateHelpText(formEditNavItem.type)
})

// инициализация формы из пропсов

watch((): boolean => isShowModal.value, ():void => {
  console.log('watch')
  formEditNavItem.type = type.value
  formEditNavItem.name = name.value
  formEditNavItem.nameSection = nameSection.value
})

// отправка на сервер чтобы внедрить изменения по меню
const editMenuItemSave = async (formEl: FormInstance | undefined):Promise<void> => {
  console.log('editMenuItemSave')
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log('formEditNavItem: ', formEditNavItem)
      // после отправки на сервер закрываем окно
      updateItem.value()
      openClose.value()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
