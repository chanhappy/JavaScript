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
  // async created() {
  //   console.log("333333333333");
  //   await new Promise((resolve) => {
  //     console.log("44444444444");
  //     resolve();
  //   }).then(() => {
  //     console.log("6666666666666666");
  //   });
  //   console.log("1010101010101010");
  // },
  mounted() {
    this.test1(); //相当于vue内部调用mixins里的created
    this.test2(); //相当于vue内部调用交易页面的created
  },
  methods: {
    async test1() {
      console.log("111111");
      await new Promise((resolve) => {
        console.log("test1");
        resolve();
      }).then(() => {
        console.log("test1 then");
      });
      console.log(3333333333); //添加事件监听的地方
    },
    async test2() {
      console.log("222222222");
      await new Promise((resolve) => {
        console.log("test2");
        resolve();
      }).then(() => {
        console.log("test2 then");
      });
      console.log(444444444444);
    },
  },

  // async mounted() {
  //   console.log("======【mounted】333333333333");
  //   await new Promise((resolve) => {
  //     console.log("=====【mounted】44444444444");
  //     resolve();
  //   })
  //     .then(() => {
  //       console.log("=====【mounted】66666666666");
  //     })
  //     .then(() => {
  //       console.log("=====【mounted】8888888888888");
  //     });
  //   console.log("=====【mounted】1010101010101010");
  // },
  // methods: {},
};
</script>
