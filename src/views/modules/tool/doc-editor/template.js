export default `
# 查询

## 开发者

你的名字

## 说明

接口说明，请简单介绍

## URL

\`\`\`
\${adminPath}/../../your-api-path
\`\`\`

## Method

\`GET\`

## 请求Headers

| 名称 | key | 描述 | 类型 | 是否必填 | 示例 |
| --- | --- | --- | --- | --- | --- |
| Token | token | 用户token| string | 必填 | 1 |

## 请求数据

| 名称 | key | 描述 | 类型 | 是否必填 | 示例 |
| --- | --- | --- | --- | --- | --- |
| 品系| strain | 鸡的品系 | string | 必填 | Y1 |
| 世代 | gen | 鸡的世代 | string | 必填 | 15 |
| 批次 | hax | 鸡的批次 | string | 必填 | 01 |
| 性别 | sex | 鸡的性别 | string | 必填 | 1 or 2 |
| 工厂 | chickenFarm | 鸡场 | string | 必填 | 1002 |

## 请求示例

如果是 \`get\` 请求，请按下面的写法，并删除下面的 post 示例

\`\`\`
\${adminPath}/../../your-api-path?a=1$b=2
\`\`\`

如果是 \`post\` 请求，请按下面的写法，并删除上面的 get 示例

\`\`\`json
[
    {
        a: aaa,
        b: bbb
    }
]
\`\`\`

## 响应Headers

无特殊响应Header

## 响应body

### main

| 名称 | key | 描述 |
| --- | --- | --- |
| 状态 | code | 请求结果 |
| 鸡笼的集合 | list | 包含笼号、栋号、鸡场号 |
| 雏鸡的集合 | cjList | 包含品系、世代、批次、家系、小家系、翅号、身份号码、用途id、性别 |

### list

| 名称 | key | 描述 |
| --- | --- | --- |
| 工厂 | chickenFarm | 鸡场号 |
| 笼号 | cageNumber | 笼号 |
| 栋号 | buildingNumber | 栋号 |

### cjList

| 名称 | key | 描述 |
| --- | --- | --- |
| 品系 | strain | 品系 |
| 世代 | gen | 世代 |
| 批次 | hax | 批次 |
| 家系 | pen | 家系 |
| 小家系 | pedigree | 小家系 |
| 翅号 | wb | 翅号 |
| 身份号 | identityNumber | 身份号 |
| 用途id | purposeId | 用途编号 |
| 性别 | sex | 性别 |

## 响应body示例

\`\`\`json
{
    "code": 0,
    "list": [
        {
            "isNewRecord": true, // 无意义，不予理会
            "chickenFarm": "1002", // 场号
            "buildingNumber": 1, //栋号
            "cageNumber": "A2" //笼号
        },
        {
            "isNewRecord": true,
            "chickenFarm": "1002",
            "buildingNumber": 1,
            "cageNumber": "A31"
        }
    ],
    "cjList": [
        {
            "isNewRecord": true,// 无意义，不予理会
            "strain": "Y1", //品系
            "gen": "15", //世代
            "hax": "01", //批次
            "pen": "002", //家系
            "pedigree": "00102", //小家系
            "wb": "00002", //翅号
            "identityNumber": "Y11500002",//身份号
            "sex": "1"//性别
        }
    ]
}
\`\`\`

## 版本

1. 2017/12/8
`;
