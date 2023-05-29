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
            <el-select :key="122" v-model="cardValidateForm.type" :disabled="isLoadingCreateCard" placeholder="Выберите тип карточки" :style="{width: '100%'}">
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
            :disabled="isLoadingCreateCard"
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
            :disabled="isLoadingCreateCard"
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
            :disabled="isLoadingCreateCard"
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
            :disabled="isLoadingCreateCard"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isLoadingCreateCard" @click="submitForm(formCreateCard)">
            создать
          </el-button>
          <el-button :disabled="isLoadingCreateCard" @click="resetForm(formCreateCard)">
            сбросить
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h6>Карточка созданная для секции обо мне</h6>
          <br>
          <el-button class="button" type="warning">
            редактировать карточку
          </el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
      content
    </el-card>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { ICardValidForm } from '~/interfaces'
import { CREATE_CARD_FOR_SECTION } from '~/apollo/mutation'
import { GET_CARD_ABOUT_ME } from '~/apollo/query'

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

const { mutate: createCardForSection, loading: isLoadingCreateCard, onDone: onDoneCreateCard } = useMutation(CREATE_CARD_FOR_SECTION)

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.validate((valid) => {
    if (valid) {
      createCardForSection({
        fields: {
          type: cardValidateForm.type,
          welcome: cardValidateForm.welcome,
          title: cardValidateForm.title,
          description: cardValidateForm.description,
          buttonName: cardValidateForm.buttonName
        } as ICardValidForm
      })

      onDoneCreateCard(() => {
        ElNotification({
          title: 'Внимание',
          message: 'создана карточка для секции обо мне',
          type: 'info'
        })
        formEl.resetFields()
      })
      // onDoneCreate(() => {
      //   ElNotification({
      //     title: 'Внимание',
      //     message: `создан элемент меню ${menuValidateForm.name}`,
      //     type: 'info'
      //   })
      //   refetch()
      //   formEl.resetFields()
      // })
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

const { result: resultData, loading: isLoadingGetCard, refetch: refetchCardAboutMe } = useQuery(GET_CARD_ABOUT_ME)

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
