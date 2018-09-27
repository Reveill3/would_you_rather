import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'

class LoginMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (e) => {
    this.setState({ anchorEl: null });
    if (e.target.firstChild != null)
    {this.props.handleChange(e.target.firstChild.data)}
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Select User
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.userids.map( (user) => (
          <MenuItem key={user} onClick={this.handleClose}>{this.props.users[user].name}</MenuItem>
        ))
        }
        </Menu>
      </div>
    );
  }
}

function mapStateToProps ({users}) {
  return {
    users: users
  }
}

export default connect(mapStateToProps)(LoginMenu);
