<template>
  <div></div>
</template>

<script>
import Test from "./test.js";

export default {
  name: "created-test",
  mixins: [Test],
  data() {
    return {};
  },
  async created() {
    console.log("333333333333");
    await new Promise((resolve) => {
      console.log("44444444444");
      resolve();
    })
      .then(() => {
        console.log("66666666666");
      })
      .then(() => {
        console.log("8888888888888");
      });
    console.log("1010101010101010");
  },
  async mounted() {
    console.log("【mounted】333333333333");
    await new Promise((resolve) => {
      console.log("【mounted】44444444444");
      resolve();
    })
      .then(() => {
        console.log("【mounted】66666666666");
      })
      .then(() => {
        console.log("【mounted】8888888888888");
      });
    console.log("【mounted】1010101010101010");
  },
  methods: {},
};
</script>
