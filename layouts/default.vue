<script setup></script>

<template>
  <v-app>
    <v-app-bar flat color="surface">
      <Header is-header :fluid="false"></Header>
    </v-app-bar>

    <v-main> <slot> </slot></v-main>
  </v-app>
</template>
