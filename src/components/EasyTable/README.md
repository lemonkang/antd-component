# EasyTable for React

EasyTable 是一个基于 React 和 Ant Design 的表格组件库，它使用 TypeScript 编写。EasyTable 旨在简化表格组件的使用，提供更方便、简单的配置筛选、排序等功能。它适用于大多数场景，包括渲染列表、设置操作列、部分列具有筛选或排序功能以及底部分页。

## API

### CustomConfig
CustomConfig 是 EasyTable 的核心配置，包括以下部分：

- filter (可选): 列过滤器配置对象。键为列的 dataIndex，值为 FilterConfig 对象。
- sorter (可选): 列排序配置对象。键为列的 dataIndex，值为 "descend"、"ascend" 或 null。
- formatter (可选): 列格式化配置对象。键为列的 dataIndex，值为 FormatterConfig 对象。
- colEmptyText (可选): 当列为空时显示的文本。
- action (可选): 操作列的配置对象，类型为 ActionConfig。
- onRefresh (可选): 刷新操作的回调函数。
- onReset (可选): 重置操作的回调函数。
- filterSerialize (可选): 过滤器序列化函数，接收一个字符串数组并返回一个字符串。
- onTableConditionChange (可选): 表格条件更改时的回调函数。接收一个包含 current、pageSize、filter 和 sorter 的对象。
### FilterConfig
列过滤器配置对象，包括以下属性：

- options: 过滤器选项数组。每个选项包含 text 和 value 属性。
- multiple (可选): 是否允许多选。默认为 false。
- value (可选): 已选过滤器值数组。
### FormatterConfig
列格式化配置对象，包括以下属性：

- type: 格式化类型，可选值为 "enum"、"datetime" 或 "currency"。
- hasUnit (可选): 货币格式化时是否显示单位。默认为 false。
- datetimeFormat (可选): 日期时间格式化字符串。默认为 "DD MMM YYYY HH:mm"。
- enum (可选): 枚举对象。键为枚举值，值为枚举文本或自定义渲染函数。
### ActionConfig
操作列配置对象，包括以下属性：

- title (可选): 操作列标题。默认为 "Operation"。
- props (可选): 操作列其他属性，类型为 ColumnType<any>。
- items (可选): 操作项数组。每个操作项包含以下属性：
  - text: 操作项文本。
  - disabled (可选): 是否禁用操作项。接收一个 record 参数并返回一个布尔值。
  - danger (可选): 操作项是否为危险操作。可为布尔值或接收一个 record 参数并返回一个布尔值。
  - visible (可选): 操作项是否可见。接收一个 record 参数并返回一个布尔值。
  - onClick (可选): 操作项点击回调。接收一个包含 onRefresh、onReset 和 record 的对象。
