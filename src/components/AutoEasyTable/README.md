# AutoEasyTable

基于`EasyTable`，支持自动获取数据和刷新列表功能。

## AutoEasyTableProps

支持所有的 EasyTableProps, 并包含以下属性：
- url - 请求数据的URL，只能是 GET 类请求
- defaultQuery - 默认的 GET params
- responseToTableData - 将返回数据处理成Table可以处理的 data 格式，提供默认处理函数
- customAxiosConfig - 传递给 axios
- onError - 请求失败或者处理失败的回调函数
- onSuccess - 请求成功的回调函数，暴露请求的 data
- table$ - 基于`ahooks`的 event emitter，用于在父组件触发 table 的刷新、重置等
- mute - 错误是否提示