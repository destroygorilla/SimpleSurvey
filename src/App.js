import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import NavigationIcon from '@material-ui/icons/Navigation';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Prepare Database
import {firebaseDb} from './config'

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

const rootRef = firebaseDb.ref();

function splitAnswers(a) {
  return a.split(',');
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.as = splitAnswers(props.a);
    this.dbRef = rootRef.child(props.q);
    this.state = {
      value: null,
      sent: false,
      sync: false,
      msg: null,
      rec: this.makeEmptyRec(),
    };
    this.sync();
  }

  handleChange = event => {
    let key = event.target.value;
    console.log('change', key);

    this.setState({ value: key });
  };

  handleSend = event => {
    console.log('send');

    if (this.state.value !== null) {
      this.vote();
      this.setState({ rec: this.state.rec });
      this.setState({ sent: true });
      this.setState({ msg: "回答ありがとうございます！" });
    } else {
      this.setState({ msg: "どれか１つを選んでください" });
    }
  };

  vote() {
    this.state.rec[this.state.value]++;
    this.dbRef.update(this.state.rec);
    console.log('update db');
  }

  sync() {
    this.dbRef.on('value',
      x => {
        let v = x.val();
        console.log('rec:', v);
        if (v === null) {
          this.dbRef.set(this.state.rec);
        } else {
          this.setState({ rec: v });
        }
      },
      e => {console.log('Sync Error:', e);},
      this
    );
  }

  makeEmptyRec() {
    let newRec = {};
    this.as.forEach(x => { newRec[x] = 0; });
    return newRec;
  }

  label(key) {
    return key + " (" + String(this.state.rec[key]) + ")";
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            <Typography variant="h5" color="textSecondary">{this.props.q}</Typography>
          </FormLabel>
          <RadioGroup
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.as.map(
              x => <FormControlLabel control={<Radio />} value={x} label={this.label(x)}/>
            )}
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleSend}
            disabled={this.state.sent}
          >
            <NavigationIcon className={classes.extendedIcon} /> 回答
            </Button>
            <FormHelperText>{this.state.msg}</FormHelperText>
          </FormControl>
        </Paper>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  q: PropTypes.string.isRequired,
  a: PropTypes.string.isRequired,
};

export default withStyles(styles)(App);
