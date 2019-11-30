import React from "react";
import { getAllCurrentUsers } from "../../../Redux/actions/dataActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// react-select
import Select from "react-select";

class SearchBar extends React.Component {

  handleChange = selectedOption => {
    this.props.history.push(`/users/${selectedOption.value}`);
  };

  render() {
    const suggestions = this.props.users.map(suggestion => ({
      value: suggestion.handle,
      label: suggestion.handle,
      imageUrl: suggestion.imageUrl
    }));

    return (
      <Select
        onChange={this.handleChange}
        options={suggestions}
        onFocus={() => this.props.getAllCurrentUsers()}
        placeholder="Search Users ..."
      />
    );
  }
}

const mapStateToProps = state => ({
  users: state.data.users
});

export default connect(
  mapStateToProps,
  { getAllCurrentUsers }
)(withRouter(SearchBar));
