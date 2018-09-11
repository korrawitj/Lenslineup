import React from 'react'
import { connect } from 'react-redux'
import { logout } from 'ducks/app'
import { Menu, Dropdown, Avatar, Badge } from 'antd'

const mapDispatchToProps = dispatch => ({
  logout: event => {
    event.preventDefault()
    dispatch(logout())
  },
})

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class ProfileMenu extends React.Component {
  state = {
    count: 0,
  }

  addCount = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  render() {
    const { count } = this.state
    const { userState, logout } = this.props
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <div className="rfq__widget__system-status__item">
            <strong>ยินดีต้อนรับ, {userState.role}</strong>

            <div>
              <strong>สิทธิ์:</strong> {userState.role}
            </div>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div className="rfq__widget__system-status__item">
            <strong>อีเมล:</strong> {userState.email}
            <br />
            <strong>เบอร์:</strong> +1-800-0000
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);">
            <i className="topbar__dropdownMenuIcon icmn-user" /> แก้ไขโปรไฟล์
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);" onClick={logout}>
            <i className="topbar__dropdownMenuIcon icmn-exit" /> ออกจากระบบ
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="topbar__dropdown d-inline-block">
        <Dropdown
          overlay={menu}
          trigger={['click']}
          placement="bottomRight"
          onVisibleChange={this.addCount}
        >
          <a className="ant-dropdown-link" href="/">
            <Badge>
              <Avatar className="topbar__avatar" shape="square" size="large" icon="user" />
            </Badge>
          </a>
        </Dropdown>
      </div>
    )
  }
}

export default ProfileMenu
