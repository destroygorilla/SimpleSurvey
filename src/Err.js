import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#f0f8ff',
    height: 'auto',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});


class Err extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h6" color="textSecondary">
          URLが正しくありませんね～
        </Typography>
        <Typography variant="h6" color="textSecondary">
          以下の形式になっていますか？
        </Typography>
        例：
        <a href={this.props.url + "?q=犬派？猫派？&a=犬派,猫派,その他"}>
          {this.props.url}?q=犬派？猫派？&a=犬派,猫派,その他
        </a>
      </Paper>
    );
  }
}

Err.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Err);
