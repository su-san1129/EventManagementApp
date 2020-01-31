<template>
  <div class="about">
    <h1>このサイトについて</h1>
    <v-card>
      <v-card-text>
        <h2 class="display-1 text--primary">
         DoorKeeperのイベント情報の確認、管理が可能です。
        </h2>
        <div class="text--primary">
          Googleで簡単ログイン ==> <v-btn text :to="{name: 'login'}">ログイン画面</v-btn><br />
          ログイン後、イベントのお気に入り登録が可能です。
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>
