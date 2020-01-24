<template>
  <v-app>
  
      <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>イベント管理アプリ</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-checkbox
          v-model="collapseOnScroll"
          color="white"
          hide-details
        ></v-checkbox>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto mt-4"
        max-height="750"
      >
        <v-container style="height: 1000px;">
          <v-content class="mt-12">
            <DataTable />
          </v-content>
        </v-container>
      </v-sheet>
  </v-app>
</template>

<script>
import DataTable from './components/DataTable';
export default {
  name: "App",

  components: {
    DataTable
  },

  data: () => ({
    //
    collapseOnScroll: true,
  })
  
};
</script>
