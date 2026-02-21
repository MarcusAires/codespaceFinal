import dotenv from "dotenv";
import platformClient from "purecloud-platform-client-v2";

dotenv.config();

 const client = platformClient.ApiClient.instance;

 client.setEnvironment(
   platformClient.PureCloudRegionHosts.sa_east_1 // ajuste aqui
 );

 await client.loginClientCredentialsGrant(
   process.env.CLIENTE_ID,
   process.env.CLIENTE_SECRET
 );

 console.log("AUTH SUCCESS");


let apiInstance = new platformClient.GroupsApi();

let groupId = "0f0534b5-7519-48e4-ba35-e8ac072ee727";  
//String | Group ID
let body = {
  "memberIds": [
    "2f94167f-adcb-43ab-a3e4-57122f843b06"
  ]
}; // Object | Add members

// Add members
apiInstance.postGroupMembers(groupId, body)
  .then((data) => {
    console.log(`postGroupMembers success! data: ${JSON.stringify(data, null, 2)}`);
  })
  .catch((err) => {
    console.log("There was a failure calling postGroupMembers");
    console.error(err);
  });
const members = await apiInstance.getGroupMembers(groupId);
console.log(members.entities.map(u=>u.id));



/* import dotenv from "dotenv";
import platformClient from "purecloud-platform-client-v2";

dotenv.config();

const client = platformClient.ApiClient.instance;

client.setEnvironment(
  platformClient.PureCloudRegionHosts.sa_east_1 // ajuste se necessário
);

async function run(){

  await client.loginClientCredentialsGrant(
    process.env.CLIENTE_ID,
    process.env.CLIENTE_SECRET
  );

  const apiInstance = new platformClient.GroupsApi();

  const groupId = "4d812978-d493-4e59-84ca-5253723c363b";

 let body = {
  "memberIds": [
    "3b9695de-b078-4da1-b25d-e95ab00b9710",
    "08bb7af4-7680-42a1-a302-2d14a257a3c5",
    "f694003a-4fb8-477e-8120-48da44a6ba75",
    "9060ee9c-2c80-4f13-a8e0-a5ed03f0f9a0",
    "478e8376-b148-4b8e-9420-c3120981b1fe",
    "82029839-0b50-49c5-98bb-9cb74b123176",
    "8df89395-de9d-485d-9b29-1fdca2d99527"
  ]
}; // Object | Add members

  const data = await apiInstance.postGroupMembers(groupId, body);

  console.log(data);
}

run(); */
