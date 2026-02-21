/*     const nomes = [
        "Ana Carolina De Sousa Santos",
        "Camila Da Silva Gomes",
        "Davi Martins Cardoso Dos Santos",
        "Fabiola Souza Caetano",
        "Gabriel Borges Da Silva",
        "Giovanna Sabino Matos",
        "Guilherme Trani Molina",
        "Janis Gabriela Santos De Oliveira",
        "Joao Lucas Silva Dos Santos",
        "Lais Gomes Bezerra",
        "Lidia Castro De Souza",
        "Melckson Erickson De Lima Andrade",
        "Sandro Roberto Palomo Balarin",
        "Sielinton Costa Bispo",
        "Thais Lucena Da Silva",
        "Vivian Marques Da Silva",
        "Yasmin Santos De Farias",
        "Yohanne Albuquerque Santos",
        "Diego Junio Da Silva",
        "Francislene Pinto Dos Santos",
        "Gustavo Rodrigues Do Carmo",
        "Laisa Cerqueira Gouveia",
        "Taiz Laureano De Macedo",
        "Anna Stella Da Silva",
        "Guilherme Rodrigues Do Nascimento",
        "Henrique Ferreira Goncalves Da Silva",
        "Kaique Rodrigues Da Silva",
        "Luana De Paula Oliveira",
        "Marcelo Yuji Ienaga",
        "Renan Oliveira Mendes",
        "Adriana Benevides Coelho Lauro",
        "Andre Da Silva Rodrigues",
        "Catia Regina Ruiz Miller",
        "Elaine Cristina Machado Da Silva",
        "Felipe Dias Da Silva",
        "Gabriel Ferreira Moreira",
        "Gabrieli Magalhaes De Oliveira",
        "Giulia Ferreira Gregorio",
        "Jaqueline Pereira Ferraz",
        "Jose Emidio Guimaraes De Brito",
        "Kathleen Silva Modesto",
        "Laura Fabiana Rodrigues",
        "Leandro Dos Santos Cecilio",
        "Luiza Ruano Bocalil",
        "Marvin Falcao De Andrade Alves",
        "Nicole Vitoria Da Conceicao Marcelino",
        "Nilza Regina Da Silva Souza",
        "Paloma De Freitas Pereira",
        "Priscila De Araujo",
        "Regiane Aparecida Dos Santos Silva",
        "Robson Leandro Alencar Dos Anjos",
        "Rodrigo Teixeira Lemes",
        "Rosilene De Paula Santos",
        "Samara Rocha Rossi Loviski",
        "Vitoria Cristina Machado Dos Santos",
        "Vitoria Walquiria Correa Oliveira",
        "Alexandre Caliongo Martins Kapete",
        "Andrea Silvia Munhoz",
        "Angela De Jesus Pinto",
        "Beatriz Estrela Santos",
        "Daniel Alves Da Silva",
        "Daniel Joao Mamani Condori",
        "Daniela Patricio Soares",
        "Diogo Augusto Da Silva",
        "Elisabete Moreira",
        "Eloise Fernandes Dos Santos",
        "Emily Alexia Lima De Sousa",
        "Fabio Da Purificacao Leite",
        "Gabriela Almeida De Brito",
        "Gabriela Ferreira Dos Santos",
        "Jaqueline Fonseca Soares Martins",
        "Kamila Silva Andrade",
        "Leonardo Moretto Mecca",
        "Lorena Aiello De Oliveira",
        "Maria Aparecida Pereira Dos Santos",
        "Maria Claudiana Lopes Da Silva",
        "Maria Vitoria Oliveira Garcia",
        "Nathalia Vetzcoski Ramos",
        "Rafaela Nunes Da Silva",
        "Tamires Santos De Lemos",
        "Thaila Santos Almeida",
        "Vitoria Santos Da Silva"
    ];

    */
const platformClient = require("purecloud-platform-client-v2");
require("dotenv").config();

const client = platformClient.ApiClient.instance;
client.setEnvironment(platformClient.PureCloudRegionHosts.sa_east_1);

async function executar() {

    await client.loginClientCredentialsGrant(
        process.env.CLIENTE_ID,
        process.env.CLIENTE_SECRET
    );

    const api = new platformClient.UsersApi();

    const nomes = [
        "Marvin Falcao De Andrade Alves",
        "Nicole Vitoria Da Conceicao Marcelino",
        "Nilza Regina Da Silva Souza",
        "Priscila De Araujo",
        "Regiane Aparecida Dos Santos Silva",
        "Rosilene De Paula Santos",
        "Samara Rocha Rossi Loviski",
        "Vitoria Cristina Machado Dos Santos",
        "Alexandre Caliongo Martins Kapete",
        "Daniel Joao Mamani Condori",
        "Maria Vitoria Oliveira Garcia",
        "Rafaela Nunes Da Silva",
        "Guilherme Trani Molina",
    ];

    for (const nome of nomes) {

        try {

            const res = await api.postUsersSearch({
                query: [{
                    type: "TERM",
                    fields: ["name"],
                    value: nome
                }]
            });

            if (res.results.length) {
                console.log(nome, "→", res.results[0].id);
            } else {
                console.log(nome, "→ NÃO ENCONTRADO");
            }

        } catch (err) {
            console.log("Erro:", nome);
            console.log(JSON.stringify(err.body || err, null, 2));
        }
    }
}

executar().catch(console.error);


