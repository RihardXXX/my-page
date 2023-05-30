<template>
  <el-dialog v-model="isShowModal" title="Редактирование элемента меню">
    <el-form
      ref="formEditCard"
      label-position="top"
      :model="formEditCardValid"
      class="demo-ruleForm"
    >
      <el-form-item
        label="приветствие в карточке"
        prop="welcome"
        :rules="[
          { required: true, message: 'поле обязательно для заполнения' },
          { type: 'string', message: 'заполните поле строкой' },
        ]"
      >
        <el-input
          v-model.number="formEditCardValid.welcome"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="заголовок карточки"
        prop="title"
        :rules="[
          { required: true, message: 'поле обязательно для заполнения' },
          { type: 'string', message: 'заполните поле строкой' },
        ]"
      >
        <el-input
          v-model.number="formEditCardValid.title"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="описание карточки"
        prop="description"
        :rules="[
          { required: true, message: 'поле обязательно для заполнения' },
          { type: 'string', message: 'заполните поле строкой' },
        ]"
      >
        <el-input
          v-model.number="formEditCardValid.description"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="текст кнопки"
        prop="buttonName"
        :rules="[
          { required: true, message: 'поле обязательно для заполнения' },
          { type: 'string', message: 'заполните поле строкой' },
        ]"
      >
        <el-input
          v-model.number="formEditCardValid.buttonName"
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
        <el-button type="primary" @click="editCardForSection(formEditCardValid)">
          сохранить изменения
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, withDefaults, toRefs, watch } from 'vue'
import type { FormInstance } from 'element-plus'

export interface IEditCard {
  id: string,
  title: string,
  welcome: string,
  buttonName: string,
  description: string
}

export interface PropsModalCardForSection {
  openClose: () => void,
  refetchCardForSection: () => void,
  isShowModal: boolean,
  id?: string,
  title?: string,
  welcome?: string,
  buttonName?: string,
  description?: string
}

const props = withDefaults(defineProps<PropsModalCardForSection>(), {
  isShowModal: false,
  id: '',
  title: '',
  welcome: '',
  buttonName: '',
  description: ''
})

const { isShowModal, id, title, welcome, openClose, refetchCardForSection, description, buttonName } = toRefs(props)

// форма для валидации ref for create item
const formEditCard = ref<FormInstance>()

// данные для редактирования в модалке
const formEditCardValid: IEditCard = reactive({
  id: '',
  title: '',
  welcome: '',
  buttonName: '',
  description: ''
})
//
// // подсказка для лейбла инпута при редактировании в модалке
// const helpTextEdit = computed<string>(() => {
//   return generateHelpText(formEditNavItem.type)
// })
//
// // инициализация формы из пропсов
//
watch((): boolean => isShowModal.value, ():void => {
  formEditCardValid.welcome = welcome.value
  formEditCardValid.title = title.value
  formEditCardValid.description = description.value
  formEditCardValid.buttonName = buttonName.value
})
//
// // изменение элементов меню
// const { mutate: updateNavItem, onDone: onDoneUpdate, onError: onErrorUpdate } = useMutation(UPDATE_NAV_ITEM)
//
// отправка на сервер чтобы внедрить изменения по меню
const editCardForSection = async (formEl: FormInstance | undefined):Promise<void> => {
  console.log('editMenuItemSave')
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log('form: ', formEl)
      // console.log('formEditNavItem: ', formEditNavItem)
      // console.log('id: ', id.value)
      // после отправки на сервер закрываем окно
      // updateNavItem({
      //   updateNavItemId: id.value,
      //   fields: {
      //     type: formEditNavItem.type,
      //     name: formEditNavItem.name,
      //     nameSection: formEditNavItem.nameSection
      //   }
      // })
      // //
      // onDoneUpdate(() => {
      //   refetchItemLIst.value()
      //   openClose.value()
      // })
      //
      // onErrorUpdate((error) => {
      //   console.log('error onErrorUpdate/editMenuItemSave', error)
      // })
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
