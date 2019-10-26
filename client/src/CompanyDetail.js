import React, { Component } from "react";
import { loadCompany } from "./requests.js";

export class CompanyDetail extends Component {
  //const {companyId} = this.props.match.params;

  state = {
    company: null
  };
  async componentDidMount() {
    const { companyId } = this.props.match.params;
    const company = await loadCompany(companyId);
    this.setState({
      company
    });
  }

  render() {
    const { company } = this.state;
    if (!company) {
      return null;
    }
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
      </div>
    );
  }
}
