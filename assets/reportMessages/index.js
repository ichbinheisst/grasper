const reports = [
  {
    message: `Me refatore, meu código está ficando uma porcaría,,deixe de ser corno e separe o estilo dos componentes do corpo dos componentes,que coisa de ámador.`,
    data: "27/01/2023",
    status: true,
  },
  {
    message: `Conecte todos as cores ao objecto cólorEsquima`,
    data: "27/01/2023",
    status: false,
  },
  {
    message: `Crie um arquivo único para funções: dicionário ,falar vocabulário ,crud de list de favoritos`,
    data: "28/01/2023",
    status: false,
  },
  {
    message: `Olhe os bugs relacionados ao tamanho dos arrays da tela ordenador`,
    data: "27/01/2023",
    status: true,
  },
  {
    message: `Ligue o indexador de idiomas no audio e não no álbum,para isso você meu criador 
    supremo,terá que verificar se há o campo idioma em cada array do mock response com o formato que eu seja capaz de ler.`,
    data: "27/01/2023",
    status: false,
  },
  {
    message: `Organize a pasta Móqui,aquilo está um lixo, você deveria ter vergonha daquilo.`,
    data: "27/01/2023",
    status: true,
  },
  {
    message: `Alterar mude a função falar da tela unscramble, use o modelo da pasta useful.`,
    data: "28/01/2023",
    status: false,
  },
  {
    message: `mude o fundo dos templates de acordo com o current audio, use a propriedade thumbnail`,
    data: "28/01/2023",
    status: true,
  },
  {
    message: `Teste a função dictionary da pasta useful`,
    data: "28/01/2023",
    status: false,
  },
];

function greet() {
  const greetings = ["Bom dia", "Boa tarde", "Boa noite"];
  const time = new Date().getHours();
  if (time > 12 && time < 18) {
    return greetings[1];
  }
  if (time > 12 && time > 18) {
    return greetings[2];
  }

  return greetings[0];
}

const Treat = [
  "meu querido programador,mestre supremo, ó grande criador",
  "meu querido poderoso programador,meu omega, criador",
  "meu caro programador,mestre supremo, ó grande criador de todos os meus sistemas.",
  "programador",
  "programadorzinho",
  "programadorzinho de meia tigela",
  "mas que porra você esta fazendo,programador tartaruga do caralho!",
];

function Politiness(numberOfTasks) {
  console.log(numberOfTasks);
  const key = numberOfTasks;
  if (key < 5) return Treat[0];
  if (key >= 5 && key < 7) return Treat[2];
  if (key >= 7 && key < 10) return Treat[3];
  if (key >= 10 && key < 14) return Treat[5];
  if (key >= 14) return Treat[6];
}

function report() {
  const lastIndex = reports.length - 1;
  const task = reports[lastIndex];
  const greeting = greet();

  const openTasks = reports.filter((item) => {
    return item.status == true;
  });

  let message = ` teste de audio`;
  if (!openTasks || !openTasks.length) {
    return (message = `${greeting},meu querido programador,
    não encontrei qualquer tarefa em aberto,peço que não esqueça de escrever os logs de futuras tarefas`);
  }

  const fullList = openTasks
    .map((item, index) => {
      return `${index + 1}, ${item.message}`;
    })
    .reduce((prev, cur) => `${prev}.${cur}`);
  let quantity = openTasks.length;
  let treat = Politiness(quantity);
  const firstTask = openTasks[0];

  message = `${greeting},${treat}. 
  O número de tarefas em aberto é ${quantity}.
  ${false ? "Lendotarefa mais antíga" : "Lendo todos as tarefas"} :
   ${false ? firstTask : fullList}.
   Bom trabalho, ${treat}.
  `;

  return message;
}

export default report;
