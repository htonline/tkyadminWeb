// 适配 Nginx 反向代理
const baseUrl = process.env.VUE_APP_BASE_API === '/' ? '' : process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 部署包上传
    deployUploadApi: baseUrl + '/api/deploy/upload',
    // SQL脚本上传
    databaseUploadApi: baseUrl + '/api/database/upload',
    // 实时控制台
    socketApi: baseUrl + '/websocket?token=kl',
    // 图片上传
    imagesUploadApi: baseUrl + '/api/localStorage/pictures',
    // 修改头像
    updateAvatarApi: baseUrl + '/api/users/updateAvatar',
    // 上传文件到七牛云
    qiNiuUploadApi: baseUrl + '/api/qiNiuContent',
    // Sql 监控
    sqlApi: baseUrl + '/druid/index.html',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html',
    // 文件上传
    fileUploadApi: baseUrl + '/api/localStorage',
    // radarPicture图片上传
    pictureUploadApi: baseUrl + '/api/radarPicture/uploadPicture',
    // baseUrl: http://localhost:8014/
    baseApi: baseUrl,
    // 预览图请求地址,查找图片的时候：本地调试用这个，找的是自己计算机上的路径，部署到服务器上时，要改成服务器ip
    pictureBaseApi: 'http://120.46.140.233:8001',
    // pictureBaseApi: 'http://localhost:8001',

    // 雷达采集文件上传
    radarFileUploadApi: baseUrl + '/api/radarAcquisitionUpload/uploadFile'
  }
}

export default api
