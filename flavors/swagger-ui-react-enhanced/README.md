# `swagger-ui-react-enhanced`


`swagger-ui-react-enhanced` is based on [`swagger-ui-react`](https://github.com/swagger-api/swagger-ui/tree/master/flavors/swagger-ui-react), intend to add some UI customization ability via options.


* Labels customizable:

    ```javascript
    localization: {
        Parameters: '参数',
        Responses: '返回',
        ParamName: '名称',
        ParamDescription: '描述',
        ParamExampleValue: '示例',
        ParamExampleModel: '模型',
        ParamContentType: '参数类型',
        ParamRequired: '必填',
        ParamEnumAvailableValues: '可选值',
        ParamDefaultValue: '默认值',
        ParamDeprecated: '弃用',
        NoParameters: '没有参数',
        RespContentType: '返回类型',
        RespCode: '代码',
        RespDescription: '描述',
        RespLinks: '相关链接',
        Schemas: '模式',
        Models: '模型'
    }
    ```
    
*  `showInfo`: Whether to show **Info** part, default to `true`

*  `showSchemes`: Whether to show **Schemes** selection dropdown, default to `true`

*  `allowTryItOut`: Allow **Try it out** button or not, default to `true`

*  `allowAuthorize`: Allow **Authorize** button or not, default to `true`

*  `allowFilter`: Allow operation filter or not, default to `false`

*  `allowSwitchContentType`: Allow content type switching or not (request/response), default to `true`


For anything else, check the [Swagger-UI](https://github.com/swagger-api/swagger-ui) repository.
