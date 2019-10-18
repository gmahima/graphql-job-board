//const { gql } = require("apollo-server-express");

//const { gql } = require("apollo-server-express");
const db = require("./db");
const Query = {
  job: (root, { id }) => db.jobs.get(id),
  company: (root, { id }) => db.companies.get(id),
  jobs: () => db.jobs.list()
};
const Job = {
  company: job => db.companies.get(job.companyId)
};
module.exports = { Query, Job };
