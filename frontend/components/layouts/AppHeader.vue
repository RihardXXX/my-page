<template>
  <header :class="$style.headerWrap">
    <!--    <Dot-->
    <!--      v-for="dot in dots"-->
    <!--      :key="dot.id"-->
    <!--      :size="dot.size"-->
    <!--      :color="dot.color"-->
    <!--      :position="dot.position"-->
    <!--    />-->
    <div :class="['container', $style.main]">
      <div :class="$style.logo">
        <span :class="$style.firstChar">F</span>
        <span :class="$style.textLogo">rontend developer</span>
      </div>
      <nav :class="$style.nav">
        <ul
          v-show="Boolean(menu.length)"
          :class="$style.navList"
        >
          <li
            v-for="menuItem in menu"
            :key="`header${menuItem.id}`"
            :class="$style.navItem"
            @click="() => selectSection(menuItem)"
          >
            {{ menuItem.name }}
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import emitter from '~/utils/emitter'
import { TEST } from '~/apollo/query'
// import Dot, { size, color, IPosition } from '@/components/Dot.vue';
// import { intersectionObserver } from '@/assets/utils';

// export interface IDots {
//   id: number | string;
//   size: size;
//   color: color;
//   position: IPosition;
// }

const { data } = await useAsyncQuery(TEST)
// @ts-ignore
console.log('result: ', data.value.test.name)

let idx = 1

// меню навигации ===
export interface MenuItem {
  id: number | string;
  name: string; // имя меню
  // будем динамически создавать в админке на английском языке и цеплять к секциям
  eventName: string; // имя события, которое будет цепляться к секции определенной и доставаться дом элемент
  element: Element | undefined; // сам элемент
}

const menu = ref<MenuItem[]>([
  {
    id: idx++,
    name: 'Обо мне',
    eventName: '',
    element: undefined
  },
  {
    id: idx++,
    name: 'Навыки',
    eventName: '',
    element: undefined
  },
  {
    id: idx++,
    name: 'Сертификаты',
    eventName: '',
    element: undefined
  },
  {
    id: idx++,
    name: 'Отзывы',
    eventName: '',
    element: undefined
  },
  {
    id: idx++,
    name: 'Портфолио',
    eventName: '',
    element: undefined
  },
  {
    id: idx++,
    name: 'Контакты',
    eventName: '',
    element: undefined
  }
])

const selectSection = (menuitem: MenuItem):void => {
  console.log('selectSection', menuitem)
  menuitem.element?.scrollIntoView({ behavior: 'smooth' })
}

// устанавливаем в меню поле element дом элемент, чтобы мы могли скроллить
onMounted(():void => {
  menu.value = menu.value.map((menuItem: MenuItem):MenuItem => {
    let newMenuItem:MenuItem = menuItem
    emitter.on(menuItem.eventName, (element: Element) => {
      newMenuItem = { ...menuItem, element }
    })
    return newMenuItem
  })
})

//     dots: [
//       {
//         id: idx++,
//         size: 'small',
//         color: 'blue',
//         position: { top: '.6', left: '33.2' },
//       },
//       {
//         id: idx++,
//         size: 'medium',
//         color: 'green',
//         position: { top: '5.6', left: '3' },
//       },
//       {
//         id: idx++,
//         size: 'medium',
//         color: 'blue',
//         position: { top: '2.2', left: '35' },
//       },
//       {
//         id: idx++,
//         size: 'small',
//         color: 'gray',
//         position: { top: '4.9', left: '30.7' },
//       },
//     ] as Array<IDots>,
//

//   };
// }

// mounted(): void {
//   const refHeader = this.$refs?.header as Element;
//
//   if (!refHeader) {
//     return;
//   }
//
//   intersectionObserver(refHeader, (isIntersecting) => {
//     this.$emit('showHeader', isIntersecting);
//   });
//
//   this.$emit('setHeaderRef', refHeader);
// },
//

</script>

<style lang="scss" module>
.headerWrap {
  width: 100%;
  height: 9.6rem;
  position: relative;

  @include respond-to(tablet) {
    height: auto;
  }

  .main {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 4rem;

    @include respond-to(tablet) {
      flex-direction: column;
      width: 100%;
    }

    .logo {
      position: relative;
      color: $green;

      @include respond-to(tablet) {
        margin-bottom: 2rem;
      }

      @include respond-to(mobile) {
        margin-bottom: 1rem;
      }

      .firstChar {
        position: absolute;
        font-size: 4.4rem;
        font-weight: 700;
        top: 0;
        left: -2.5rem;
        transform: rotate(340deg);
      }

      .textLogo {
        font-weight: 600;
        font-size: 32px;
        line-height: 150%;
      }
    }

    .navList {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .navItem {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 145%;
        margin-left: 4rem;
        transition: all 0.5s;
        cursor: pointer;

        &:first-child {
          margin-left: 0;
        }

        &:hover {
          color: $green;
          transform: scale(1.2);
        }
      }
    }

    .nav {
      @include respond-to(mobile) {
        margin: 0 1rem;

        .navList {
          flex-wrap: wrap;
          width: 100%;
          justify-content: space-between;

          .navItem {
            width: 30%;
            margin: 0.5rem 0;
            font-weight: 600;
            font-size: 1.8rem;

            &:hover {
              color: $black;
              transform: scale(1);
            }
          }
        }
      }
    }
  }
}
</style>
