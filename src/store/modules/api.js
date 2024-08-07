// 适配 Nginx 反向代理
const baseUrl = process.env.VUE_APP_BASE_API === '/' ? '' : process.env.VUE_APP_BASE_API
// 文件上传部分，如果是localhost，找的就是本地电脑上的后端服务，如果本地运行了的话，上传的就是自己的电脑上了，部署到服务器上要改成服务器的IP地址
// const fileUploadBaseURL = 'http://120.46.140.233:8001'
const fileUploadBaseURL = 'http://localhost:8001'
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
    // 预览图请求地址,查找图片的时候：本地调试用这个，找的是自己计算机上的路径，部署到服务器上时，要改成服务器ip
    // =========================除了部署时修改，以上不准再动（......）======================
    // 雷达采集文件上传
    radarFileUploadApi: fileUploadBaseURL + '/api/radarAcquisitionUpload/uploadFile',
    // radarPicture图片上传
    pictureUploadApi: fileUploadBaseURL + '/api/radarPicture/uploadPicture',
    // 现场图片的上传路径
    scenePictureUploadApi: fileUploadBaseURL + '/api/picture/uploadScenePicture',
    // 雷达图谱的上传路径
    radarSpectrumUploadApi: fileUploadBaseURL + '/api/pictureRadarSpectrum/uploadSpectrumPicture',
    // 病害模型文件的上传路径
    diseaseModelUploadApi: fileUploadBaseURL + '/api/diseaseModel/uploadDiseaseModel'
  }
}

export default api
