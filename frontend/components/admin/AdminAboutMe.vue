<template>
  <section :class="$style.aboutMe">
    <h4>Создание карточки для секции информация обо мне и пути картинки главного героя</h4>
    <ul :class="$style.help">
      <li>1. Карточки бывают разных типов</li>
      <li>2. Каждый тип карточки для каждой секции мы сами выбираем</li>
      <li>3. Загружаем фото главного героя для секции обо мне</li>
    </ul>

    <el-card class="box-card">
      <h5>Создание карточки обо мне</h5>
      <el-form
        ref="formCreateCard"
        label-position="top"
        :model="cardValidateForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="Выберите тип карточки для секции обо мне"
          prop="type"
          :rules="[ {
            required: true,
            message: 'пожалуйста выберите тип создаваемой карточки',
            trigger: 'change',
          },]"
        >
          <client-only>
            <el-select :key="122" v-model="cardValidateForm.type" :disabled="isLoadingCreatCard" placeholder="Выберите тип карточки" :style="{width: '100%'}">
              <el-option :key="122" label="карточка для секции обо мне" value="cardAboutMe" />
            </el-select>
          </client-only>
        </el-form-item>
        <el-form-item
          label="Приветствие сверху карточки"
          prop="welcome"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.trim="cardValidateForm.welcome"
            type="text"
            autocomplete="off"
            :disabled="isLoadingCreatCard"
          />
        </el-form-item>
        <el-form-item
          label="Основной текст карточки"
          prop="title"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.trim="cardValidateForm.title"
            type="text"
            autocomplete="off"
            :disabled="isLoadingCreatCard"
          />
        </el-form-item>
        <el-form-item
          label="Описание карточки"
          prop="description"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.trim="cardValidateForm.description"
            maxlength="40"
            placeholder="описание карточки"
            show-word-limit
            type="textarea"
            :disabled="isLoadingCreatCard"
          />
        </el-form-item>
        <el-form-item
          label="Название кнопки"
          prop="buttonName"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.trim="cardValidateForm.buttonName"
            type="text"
            autocomplete="off"
            :disabled="isLoadingCreatCard"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formCreateCard)">
            создать
          </el-button>
          <el-button @click="resetForm(formCreateCard)">
            сбросить
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { ICardValidForm } from '~/interfaces'

// форма для валидации ref for create item
const formCreateCard = ref<FormInstance>()
// данные для отправки на сервер
const cardValidateForm: ICardValidForm = reactive({
  type: '',
  title: '',
  welcome: '',
  buttonName: '',
  description: ''
})

const isLoadingCreatCard = ref<boolean>(false)

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.validate((valid) => {
    if (valid) {
      // createNavItem({
      //   name: menuValidateForm.name,
      //   nameSection: menuValidateForm.nameSection,
      //   type: menuValidateForm.type
      // })
      // onDoneCreate(() => {
      //   ElNotification({
      //     title: 'Внимание',
      //     message: `создан элемент меню ${menuValidateForm.name}`,
      //     type: 'info'
      //   })
      //   refetch()
      //   formEl.resetFields()
      // })
      console.log('form: ', formEl)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// сбросс формы
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}

</script>

<style lang="scss" module>

.aboutMe {
  width: 100%;
}

.help {
  margin: 2rem 0;
}

.managedList {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
