
/* ////// \\\\\\\\\\\\\/////////
*********************************
--------------------------------------
BACKUP CÓDIGO PARA RESET DA UTILIZAÇÃO
--------------------------------------
**********************************
/////\\\\\\/////////\\\\\\\\//// */
/* 
require("dotenv").config();
const usersJson = require("./config/users.json");
const platformClient = require("purecloud-platform-client-v2");

const client = platformClient.ApiClient.instance;
client.setEnvironment(platformClient.PureCloudRegionHosts.sa_east_1);

const userIds = Object.values(usersJson);

async function executar() {

  await client.loginClientCredentialsGrant(
    process.env.CLIENTE_ID,
    process.env.CLIENTE_SECRET
  );

  const usersApi = new platformClient.UsersApi();

  for (const id of userIds) {

    console.log("Resetando:", id);

    try {
      await usersApi.deleteRoutingUserUtilization(id);
      console.log("OK:", id);
    } catch (err) {
      console.log("Erro:", id, err.message);
    }
  }

  console.log("Finalizado.");
}

executar();
 */
/* 
////// \\\\\\\\\\\\\/////////
*********************************
--------------------------------------
BACKUP CÓDIGO PARA RESET DA UTILIZAÇÃO
--------------------------------------
**********************************
/////\\\\\\/////////\\\\\\\\//// */

require("dotenv").config();
const fs = require("fs");
const platformClient = require("purecloud-platform-client-v2");

// Carregamento dos arquivos de configuração
const groupsMap = require("./config/groups.json");

const client = platformClient.ApiClient.instance;
client.setEnvironment(platformClient.PureCloudRegionHosts.sa_east_1);

const usersApi = new platformClient.UsersApi();
const routingApi = new platformClient.RoutingApi();
const groupsApi = new platformClient.GroupsApi();

const LOG_FILE = "./log.txt";
const DELAY = 1000; // Aumentado para 1s para garantir estabilidade com 82 users
const CONCURRENCY = 5; // Processa 5 usuários por vez em paralelo

function log(msg) {
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const mensagem = `[${timestamp}] ${msg}`;
  console.log(mensagem);
  fs.appendFileSync(LOG_FILE, mensagem + "\n");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry(fn, tentativas = 3) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === tentativas - 1) throw err;
      await sleep(1000 * (i + 1));
    }
  }
}

// Busca as filas que o usuário já pertence atualmente
async function getUsuarioFilasAtuais(userId) {
  try {
    const res = await retry(() => routingApi.getUserQueues(userId));
    return res.entities ? res.entities.map(q => q.id) : [];
  } catch (e) {
    log(`ERRO AO BUSCAR FILAS ATUAIS: ${userId} | ${e.message}`);
    return [];
  }
}

async function getAllMembers(groupId) {
  let page = 1;
  let all = [];
  while (true) {
    const res = await retry(() =>
      groupsApi.getGroupMembers(groupId, { pageSize: 100, pageNumber: page })
    );
    if (!res.entities || !res.entities.length) break;
    all = all.concat(res.entities);
    page++;
  }
  return all;
}

async function processarUsuario(userId, filasNovas) {
  try {
    // 1. Reset de Utilização
    await retry(() => usersApi.deleteRoutingUserUtilization(userId));
    log(`RESET UTILIZAÇÃO OK: ${userId}`);
    await sleep(DELAY); // Respiro após reset

    // 2. Limpeza de filas antigas
    const filasAntigas = await getUsuarioFilasAtuais(userId);
    
    for (const queueId of filasAntigas) {
      if (!filasNovas.includes(queueId)) {
        try {
          await retry(() => 
            routingApi.postRoutingQueueMembers(queueId, [{ id: userId }], { "_delete": true })
          );
          log(`REMOVIDO DA FILA ANTIGA: ${userId} -> ${queueId}`);
          await sleep(DELAY); // Delay obrigatório após cada remoção
        } catch (e) {
          log(`ERRO AO REMOVER FILA ${queueId}: ${e.message}`);
        }
      }
    }

    // 3. Atribuição de filas novas
    for (const queueId of filasNovas) {
      try {
        await retry(() => 
          routingApi.postRoutingQueueMembers(queueId, [{ id: userId }], { "_delete": false })
        );
        log(`MEMBRO ATRIBUÍDO: ${userId} -> ${queueId}`);
        await sleep(DELAY); // Delay obrigatório após cada inserção
      } catch (e) {
        log(`ERRO ATRIBUIÇÃO: ${userId} -> ${queueId} | ${e.message}`);
      }
    }

  } catch (e) {
    log(`ERRO CRÍTICO NO USUÁRIO ${userId}: ${e.message}`);
  }
}

async function executarGrupo(group) {
  log("\n===== INICIANDO GRUPO: " + group.groupName + " =====");

  let membros;
  try {
    membros = await getAllMembers(group.groupId);
    log(`Total de membros no grupo: ${membros.length}`);
  } catch (err) {
    log("ERRO AO OBTER MEMBROS DO GRUPO: " + group.groupName + " | " + err.message);
    return;
  }

  const filasIDs = group.queues.map(q => q.id);

  
  // Processar um usuário por vez para respeitar o Rate Limit
  for (let i = 0; i < membros.length; i++) {
    const user = membros[i];
    log(`Progresso: [${i + 1}/${membros.length}] Processando: ${user.id}`);
    
    // Aguarda o término total de um usuário antes de começar o próximo
    await processarUsuario(user.id, filasIDs);
  }
}

async function executar() {
  log("========== INICIANDO PROCESSO DE SINCRONIZAÇÃO ==========");

  try {
    await client.loginClientCredentialsGrant(
      process.env.CLIENTE_ID,
      process.env.CLIENTE_SECRET
    );
    log("Autenticação realizada com sucesso.");

    // Percorre todos os grupos configurados no JSON
    for (const group of groupsMap) {
      await executarGrupo(group);
    }

  } catch (e) {
    log("ERRO FATAL DE AUTENTICAÇÃO: " + e.message);
  }

  log("========== PROCESSO FINALIZADO COM SUCESSO ==========");
}

executar().catch(e => log("ERRO NÃO TRATADO: " + e.message));