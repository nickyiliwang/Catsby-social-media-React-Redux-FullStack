import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { getAllCurrentUsers } from "../../../Redux/actions/dataActions";
import { connect } from "react-redux";

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ])
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  /**
   * Children to render.
   */
  children: PropTypes.node,
  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ]).isRequired,
  selectProps: PropTypes.object.isRequired
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired
  }).isRequired,
  /**
   * Inner ref to DOM Node
   */
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ]).isRequired,
  /**
   * Whether the option is focused.
   */
  isFocused: PropTypes.bool.isRequired,
  /**
   * Whether the option is selected.
   */
  isSelected: PropTypes.bool.isRequired
};

function Placeholder(props) {
  const { innerProps = {}, children } = props;
  return (
    <Typography color="textSecondary" {...innerProps}>
      {children}
    </Typography>
  );
}

Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function SingleValue(props) {
  return <Typography {...props.innerProps}>{props.children}</Typography>;
}

SingleValue.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.any.isRequired,
  selectProps: PropTypes.object.isRequired
};

function ValueContainer(props) {
  return <div>{props.children}</div>;
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
};

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool.isRequired,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired
  }).isRequired,
  selectProps: PropTypes.object.isRequired
};

function Menu(props) {
  return (
    <Paper square {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

const SearchBar = props => {
  const suggestions = props.users.map(suggestion => ({
    value: suggestion.handle,
    label: suggestion.handle
  }));
  const [single, setSingle] = React.useState(null);

  const handleChangeSingle = value => {
    setSingle(value);
  };

  return (
    <div>
      <NoSsr>
        <Select
          // inputId="react-select-single"
          TextFieldProps={{
            InputLabelProps: {
              // htmlFor: "react-select-single",
              shrink: true
            }
          }}
          placeholder="Search for user ..."
          options={suggestions}
          components={components}
          value={single}
          onChange={handleChangeSingle}
          onFocus={() => props.getAllCurrentUsers()}
        />
        <div />
      </NoSsr>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.data.users
});

export default connect(
  mapStateToProps,
  { getAllCurrentUsers }
)(SearchBar);
