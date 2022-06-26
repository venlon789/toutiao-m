module.exports = {
  plugins: {
    // 脚手架已经配置过了，不需要在配置
    //   'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    'postcss-pxtorem': {
      // 把px辗转为rem
      //   lib-flexxible.一行分成10份
      //
      rootValue: ({ file }) => {
        // console.log(obj);
        console.log('处理的css文件', file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 所以属性都可以转，单独某个属性，比如propList：["height"]
      propList: ['*']
    }
  }
}
