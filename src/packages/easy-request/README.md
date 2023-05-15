# Request 使用说明

## 支持以下功能
1. 自动添加 token, 如果 requestConfig['headers']中包含了 token,则忽略 [done]
2. 更加灵活的 paramsSerializer 的传入方式 [done]
3. camel case & snake case switch [done]
4. 提供封装好的通用文件上传接口
5. token 失效自动发起 refresh 请求

## 功能说明
`easy-request` 是基于 `axios` 创造的请求实例, 封装了一些调用接口更加便捷的功能. 例如根据后端返回字段的case style 完成自动的发送请求与拿到返回数据的 case style 转换.
在这里, 对封装功能作一个更详细的描述:
1. 默认添加 headers.Authorization, 如果**在调用请求的时候, 设置 headers.Authorization 为 false, 则忽略.
2. 对于 post/put/delete 请求, 会自动根据 data 的类型在 headers 中添加 content-type
3. 对于 content-type 为`application/json`类型的请求, 会完成 snake-case 的字段转换, 对于`multipart/form-data`类型的请求, 会完成 formData 中的 key 的 snake-case 转换
4. 对于返回 content-type 为`application/json`类型的响应, 会将返回数据的 key 转换为 camel-case
5. 对于包含 params 的请求, 如果默认处理的 arrayFormat 为`comma`, 也可以自己传递 paramsSerializer 完成自定义的替换
6. 如果请求返回 token 已失效, 则会重定向到登录页面

## 生成`custom-axios`的参数说明
```typescript
/**
 * customAxios - the function to create custom axios instance.
 * @param axiosConfig[optional] - AxiosRequestConfig, default axios request config, like baseUrl
 * @param getJWTToken[optional] - function, used in setting default authorization value
 * @param paramsStringifyOptions[optional] - IStringifyOptions, the params of qs.stringify
 * @param refreshInterceptor[optional].refreshTokenCall - function, the function to refresh token
 * @param refreshinterceptor[optional].refreshCondition - function, judge axios error is expored token errot, return false
 * @param refreshinterceptor[optional].refreshAbortCondition - function, judge the refresh call should be abort, return false
 */
```
