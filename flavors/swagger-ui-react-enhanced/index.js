import React from "react"
import PropTypes from "prop-types"
import swaggerUIConstructor from "./swagger-ui"

function disableInfoPlugin() {
  return {
    wrapComponents: {
      InfoContainer: () => () => null
    }
  };
}

function disableSchemesPlugin() {
  return {
    wrapComponents: {
      SchemesContainer: () => () => null
    }
  };
}

function disableAuthorizePlugin() {
  return {
    wrapComponents: {
      authorizeBtn: () => () => null,
      authorizeOperationBtn: () => () => null
    }
  };
};

function disableTryItOutPlugin() {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false
        }
      }
    }
  }
}

export default class SwaggerUI extends React.Component {
  static propTypes = {
    spec: PropTypes.object,
    url: PropTypes.string,
    showInfo: PropTypes.bool,
    showSchemes: PropTypes.bool,
    allowTryItOut: PropTypes.bool,
    allowAuthorize: PropTypes.bool,
    allowFilter: PropTypes.bool,
    allowSwitchContentType: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.SwaggerUIComponent = null
    this.system = null
  }

  componentDidMount() {
    const plugins = []
    const { showInfo, showSchemes, allowTryItOut, allowAuthorize, allowFilter, allowSwitchContentType, localization } = this.props
    
    if(showInfo === false) {
      plugins.push(disableInfoPlugin)
    }
    if(showSchemes === false) {
      plugins.push(disableSchemesPlugin)
    }
    if (allowTryItOut === false) {
      plugins.push(disableTryItOutPlugin)
    }
    if (allowAuthorize === false) {
      plugins.push(disableAuthorizePlugin)
    }

    const ui = swaggerUIConstructor({
      spec: this.props.spec,
      url: this.props.url,
      requestInterceptor: this.requestInterceptor,
      responseInterceptor: this.responseInterceptor,
      onComplete: this.onComplete,
      localization: localization || {},
      filter: allowFilter,
      allowSwitchContentType,
      showInfo,
      showSchemes,
      plugins
    })

    this.system = ui
    this.SwaggerUIComponent = ui.getComponent("App", "root")

    this.forceUpdate()
  }

  render() {
    return this.SwaggerUIComponent ? <this.SwaggerUIComponent /> : null
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      // flush current content
      this.system.specActions.updateSpec("")

      if (this.props.url) {
        // update the internal URL
        this.system.specActions.updateUrl(this.props.url)
        // trigger remote definition fetch
        this.system.specActions.download(this.props.url)
      }
    }

    if (this.props.spec !== prevProps.spec && this.props.spec) {
      if (typeof this.props.spec === "object") {
        this.system.specActions.updateSpec(JSON.stringify(this.props.spec))
      } else {
        this.system.specActions.updateSpec(this.props.spec)
      }
    }
  }

  requestInterceptor = (req) => {
    if (typeof this.props.requestInterceptor === "function") {
      return this.props.requestInterceptor(req)
    }
    return req
  }

  responseInterceptor = (res) => {
    if (typeof this.props.responseInterceptor === "function") {
      return this.props.responseInterceptor(res)
    }
    return res
  }

  onComplete = () => {
    if (typeof this.props.onComplete === "function") {
      return this.props.onComplete()
    }
  }
}

SwaggerUI.propTypes = {
  spec: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.object,
  ]),
  url: PropTypes.string,
  requestInterceptor: PropTypes.func,
  responseInterceptor: PropTypes.func,
  onComplete: PropTypes.func,
}