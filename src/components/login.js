import React, {Component} from 'react'

class Login extends Component {
  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            Login using Slack
          </div>
          <div className="panel-body">
            <a href="/auth/slack">
              <img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"/>
            </a>
          </div>
        </div>
      </div>
    )
  }
}


export default Login