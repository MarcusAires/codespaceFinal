require("dotenv").config();
const platformClient = require("purecloud-platform-client-v2");

const client = platformClient.ApiClient.instance;
client.setEnvironment(platformClient.PureCloudRegionHosts.sa_east_1);

async function listarFilas() {

  await client.loginClientCredentialsGrant(
    process.env.CLIENTE_ID,
    process.env.CLIENTE_SECRET
  );

  const routingApi = new platformClient.RoutingApi();

  const filas = await routingApi.getRoutingQueues({ pageSize: 100 });

  filas.entities.forEach(f => {
    console.log(f.name, "=", f.id);
  });
}

listarFilas();
