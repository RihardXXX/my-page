<template>
  <el-dialog v-model="isShow" title="Редактирование элемента меню">
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
        <el-button type="primary" @click="editCardForSection(formEditCard)">
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
import { UPDATE_CARD_FOR_SECTION } from '~/apollo/mutation'

export interface PropsModalCardForSection {
  openClose: () => void,
  refetchCardForSection: () => void,
  isShowModal: boolean,
  id?: string,
  title?: string,
  welcome?: string,
  buttonName?: string,
  description?: string
  type?: string
}

export interface IEditCard {
  title: string,
  welcome: string,
  buttonName: string,
  description: string
  type?: string
  id?: string
}

const props = withDefaults(defineProps<PropsModalCardForSection>(), {
  // isShowModal: false,
  id: '',
  title: '',
  welcome: '',
  buttonName: '',
  description: ''
})

const { isShowModal, id, title, welcome, openClose, refetchCardForSection, description, buttonName, type } = toRefs(props)

const isShow = ref(false)

watch(() => isShowModal.value, () => {
  isShow.value = isShowModal.value
})

// форма для валидации ref for create item
const formEditCard = ref<FormInstance>()

// данные для редактирования в модалке
const formEditCardValid: IEditCard = reactive({
  title: '',
  welcome: '',
  buttonName: '',
  description: ''
})

watch((): boolean => isShowModal.value, ():void => {
  formEditCardValid.welcome = welcome.value
  formEditCardValid.title = title.value
  formEditCardValid.description = description.value
  formEditCardValid.buttonName = buttonName.value
})

const { mutate: updateCardSection, onDone: onDoneCard, onError: onErrorCard } = useMutation(UPDATE_CARD_FOR_SECTION)

// отправка на сервер чтобы внедрить изменения по меню
const editCardForSection = async (formEl: FormInstance | undefined):Promise<void> => {
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      updateCardSection({
        updateCardForSectionId: id.value,
        fields: {
          title: formEditCardValid.title,
          welcome: formEditCardValid.welcome,
          buttonName: formEditCardValid.buttonName,
          description: formEditCardValid.description,
          type: type?.value
        }
      })

      onDoneCard((data) => {
        console.log(data)
        refetchCardForSection.value()
        openClose.value()
      })

      onErrorCard((e) => {
        console.log('editCardForSection/error: ', e)
      })
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
