<template>
  <ul :class="{ 'navbar-nav': level == 1, 'dropdown-menu': level != 1 }">
    <li
      v-for="(item, key) in items"
      :key="key"
      :class="{
        'nav-item': level == 1,
        dropdown: level == 1 && item.submenu && item.submenu.length != 0,
        'dropdown-submenu':
          level != 1 && item.submenu && item.submenu.length != 0,
      }"
    >
      <router-link
        v-if="item?.to"
        :class="{
          'nav-link': level == 1,
          'dropdown-item': level != 1,
          'dropdown-toggle': item.submenu && item.submenu.length != 0,
        }"
        :to="item.to"
      >
        {{ item.title }}
      </router-link>
      <a
        v-else
        :class="{
          'nav-link': level == 1,
          'dropdown-item': level != 1,
          'dropdown-toggle': item.submenu && item.submenu.length != 0,
        }"
        :href="item.href ?? '#'"
        :target="item.href ? item.target ?? '_blank' : null"
      >
        {{ item.title }}
      </a>
      <MainMenuItems
        v-if="item.submenu && item.submenu.length != 0"
        :items="item.submenu"
        :level="level + 1"
      />
    </li>
    <li>
      <hr />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-nav {
  text-transform: uppercase;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  flex-direction: row;

  li {
    &:hover > ul.dropdown-menu {
      display: block;
    }

    &.nav-item {
      background-color: #fff;
      color: #000;
      margin: 0 5px 0 5px;
      font-weight: 700;
      font-size: 14px;
      line-height: 0.9;
      text-align: center;
      height: 40px;
      align-content: center;
      border-width: 2px;
      border-style: solid;
      border-color: var(--bs-primary);
      border-image: linear-gradient(to bottom, #fff, var(--bs-primary)) 1;
      box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.3);

      @media (max-width: 1000px) {
        font-size: 12px;
        font-weight: 700;
        margin: 0 3px 0 3px;
      }

      &:hover {
        background-color: var(--bs-primary);
        border-image: linear-gradient(
            to bottom,
            var(--bs-primary),
            var(--bs-primary)
          )
          1;

        > a {
          color: #fff;
        }
      }

      > a {
        padding: 0 14px 0 14px;
        margin: 0;
        color: #000;
        height: 100%;
        align-content: center;

        &:hover {
          text-decoration: none;
        }
      }

      hr {
        padding: 0;
        margin: 0 10px;
        border-width: 6px;
        border-color: var(--bs-primary);
        opacity: 1;
      }
    }

    .dropdown-menu {
      top: 0;
      margin-top: 36px;
      border-radius: 0;
      box-shadow: 0px 4px 12px 3px rgba(0, 0, 0, 0.3);
      width: 240px;

      > li {
        > a {
          color: #000;
          font-size: 15px;
          font-weight: 600;
          border-bottom: 1px solid var(--bs-primary);
          padding: 10px 5px 8px 5px;
          margin: 0 10px;
          width: calc(100% - 20px);
          text-wrap: auto;

          &:hover {
            background-color: var(--bs-primary);
            text-decoration: none;
          }

          &:hover:after {
            text-decoration: underline;
            transform: rotate(-90deg);
          }
        }
      }

      .dropdown-submenu {
        position: relative;

        > .dropdown-menu {
          top: 0;
          left: calc(100% - 10px);
          margin-top: -6px;
        }
      }
    }
  }
}
</style>
