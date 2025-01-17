const endPointUrl = "https://m6whk.sse.codesandbox.io/graphql";

async function graphqlRequest(query, variables = {}) {
  const res = await fetch(endPointUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query,
      variables
    })
  });
  const resBody = await res.json();
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
