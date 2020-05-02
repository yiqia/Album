const qiniu_sdk = require('qiniu')
 
qiniu_sdk.conf.ACCESS_KEY = "ETQcNVAs6b8Rh1moXlIK-9EMbsZhiiTxiUTuOY1_"
qiniu_sdk.conf.SECRET_KEY = "gnYi22sTZCrFYlEwSeHMjBoRl53CemGw5sS16d8X"
qiniu_sdk.conf.url="http://love.q05.cc/"
 
// 要上传的空间
const bucket = "bimu"
 
// 文件前缀
const prefix = 'image/'
 
// 生成上传文件的 token
const token = (bucket, key) => {
    
    const policy = new qiniu_sdk.rs.PutPolicy({ isPrefixalScope: 1, scope: bucket + ':' + key })
 
 
    return policy.uploadToken()
}
 
const config = new qiniu_sdk.conf.Config()
 
const upload_file = (file_name, file_path,black) => {
    // 保存到七牛的地址
    const file_save_path = prefix + file_name
 
    // 七牛上传的token
    const up_token = token(bucket, file_save_path)
 
    const extra = new qiniu_sdk.form_up.PutExtra()
 
    const formUploader = new qiniu_sdk.form_up.FormUploader(config)
 
    // 上传文件
    formUploader.putFile(up_token, file_save_path, file_path, extra, (err, ret) => {
        if (!err) {
            // 上传成功， 处理返回值
			ret.url=qiniu_sdk.conf.url;
			black(ret)
        } else {
            // 上传失败， 处理返回代码
            console.error(err);
        }
    });
}
module.exports=upload_file;
//upload_file('test.png', '../../static/index.png')
