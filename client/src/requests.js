const endPointUrl = "https://216po.sse.codesandbox.io/graphql";

async function graphqlRequest(query, variables = {}) {
  //console.log(variables);
  const res = await fetch(endPointUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables })
  });
  const resBody = await res.json();
  if (resBody.errors) {
    const message = resBody.errors.map(error => error.message).join("\n");
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
  console.log("cfbdfd");
  let res;
  try {
    res = await graphqlRequest(query, { id });
  } catch (e) {
    console.log(e.message);
  }

  return res.company;
}
