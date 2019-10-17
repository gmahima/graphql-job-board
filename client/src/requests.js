const endPointUrl = "https://m6whk.sse.codesandbox.io/graphql";
export async function loadJobs() {
  const res = await fetch(endPointUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `{jobs{
        title
        company{
          name
        }
      }}`
    })
  });
  const resBody = await res.json();
  return resBody.data.jobs;
}
