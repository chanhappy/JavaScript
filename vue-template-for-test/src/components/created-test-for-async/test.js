export default {
    async created() {
        console.log("1111111111111")
        await new Promise((resolve) => {
            console.log('222222222222')
            resolve()
          })
            .then(() => {
              console.log('55555555555')
            })
            .then(() => {
              console.log('77777777777')
            })
        console.log("999999999999 这里的代码相当于事件监听的添加")
    }
}