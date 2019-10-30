import { isLoggedIn, getAccessToken } from "./auth";
const endPointUrl = "https://ckvb1.sse.codesandbox.io/graphql";

async function graphqlRequest(query, variables = {}) {
  //console.log(variables);

  let request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables })
  };
  if (isLoggedIn()) {
    console.log(getAccessToken());
    request.headers["authorization"] = "Bearer " + getAccessToken();
  }

  const res = await fetch(endPointUrl, request);
  const resBody = await res.json();
  if (resBody.errors) {
    const message = resBody.errors.map(error => error.message).join("\n");
    console.log("hi");
    throw new Error(message);
  }
  //  console.log(resBody.data);
  return resBody.data;
}

export async function loadJobs() {
  const query = `{jobs{
    title
    id
    company{
      name
      id
    }
  }}`;
  const { jobs } = await graphqlRequest(query);
  return jobs;
}
export async function loadJob(id) {
  const query = `query jobQuery($id:ID!){
    job(id: $id){
      id
      title
      company{
        id
        name
      }
      description
    }
  }`;
  const res = await graphqlRequest(query, { id });
  return res.job;
}

export async function loadCompany(id) {
  //console.log(id);
  const query = `query getComp($id: ID!){
    company(id:$id){
      id
      name
      description
      jobs{
        id
        title
      }
    }
  }`;
  let res;
  try {
    res = await graphqlRequest(query, { id });
  } catch (e) {
    console.log(e.message);
  }

  return res.company;
}
export async function addJob(input) {
  //console.log(id);
  const mutation = `mutation CreateJob($input:CreateJobInput){
    job:createJob(input:$input){
      id
      title
      description
    }
  }`;
  let res;
  try {
    res = await graphqlRequest(mutation, { input });
  } catch (e) {
    console.log(e.message);
  }

  return res.job;
}
