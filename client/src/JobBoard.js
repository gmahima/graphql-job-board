import React, { Component } from "react";
import { JobList } from "./JobList";
//const { jloadJobs } = require('./fake-data');
import { loadJobs } from "./requests.js";
export class JobBoard extends Component {
  state = {
    jobs: []
  };
  async componentDidMount() {
    const jobs = await loadJobs();
    this.setState({jobs});
  }
  render() {
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={this.state.jobs} />
      </div>
    );
  }
}
