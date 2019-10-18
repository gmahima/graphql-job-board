const endPointUrl = "https://m6whk.sse.codesandbox.io/graphql";
export async function loadJobs() {
  const res = await fetch(endPointUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `{jobs{
        title
        id
        company{
          name
          id
        }
      }}`
    })
  });
  const resBody = await res.json();
  return resBody.data.jobs;
}
export async function loadJob(id) {
  const res = await fetch(endPointUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `query jobQuery($id:ID!){
        job(id: $id){
          id
          title
          company{
            id
            name
          }
          description
        }
      }`,
      variables: { id }
    })
  });
  const resBody = await res.json();
  return resBody.data.job;
}
