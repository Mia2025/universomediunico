/* TAROT INTERATIVO — Pai Rafael de Maria Padilha
   Baralho cigano (36 cartas). Sem backend. */

const CARTAS = [
  ["O Cavaleiro","Uma notícia está a caminho. Movimento chegando na sua vida, mais rápido do que você espera."],
  ["O Trevo","Uma sorte pequena e passageira. Aproveite a janela enquanto ela está aberta."],
  ["O Navio","Distância, viagem ou mudança. Algo em você já partiu, mesmo que o corpo ainda não tenha ido."],
  ["A Casa","Sua base pede atenção. A resposta que você procura fora está dentro de casa."],
  ["A Árvore","Saúde e raiz. O que você plantou está crescendo devagar, mas está crescendo."],
  ["As Nuvens","Confusão temporária. Não decida nada importante enquanto o céu não abrir."],
  ["A Serpente","Tem desvio no caminho. Alguém ou algo não é o que aparenta."],
  ["O Caixão","Um ciclo terminou. Segurar o que já morreu só atrasa o que quer nascer."],
  ["O Buquê","Um presente, um convite, uma alegria. Aceite sem desconfiar de tudo."],
  ["A Foice","Corte necessário. Rápido dói menos que devagar."],
  ["O Chicote","Conflito que se repete. A briga não é sobre o que vocês estão brigando."],
  ["Os Pássaros","Conversas demais, ansiedade no ar. Nem tudo que falam de você merece resposta."],
  ["A Criança","Um começo pequeno. Trate o novo com o cuidado que ele pede."],
  ["A Raposa","Atenção com quem se aproxima sorrindo. Nem toda ajuda é ajuda."],
  ["O Urso","Uma força maior te protege, mas também pode te sufocar. Veja de quem é essa força."],
  ["As Estrelas","Caminho aberto e claridade. Siga o que você já sabe que é verdade."],
  ["A Cegonha","Mudança chegando. O que estava parado vai sair do lugar."],
  ["O Cachorro","Uma amizade leal por perto. Confie em quem já provou que fica."],
  ["A Torre","Solidão que ensina. Este é um tempo de olhar para si, não de se isolar do mundo."],
  ["O Jardim","Vida social, encontros, exposição. O que você quer que vejam de você?"],
  ["A Montanha","Obstáculo à frente. Não é o fim do caminho, é o teste dele."],
  ["Os Caminhos","Uma escolha inevitável. Não escolher também é escolher, e custa mais caro."],
  ["O Rato","Algo está te desgastando aos poucos. Descubra o vazamento antes que esvazie."],
  ["O Coração","O amor está no centro da questão. Comece perguntando o que o seu coração já respondeu."],
  ["O Anel","Compromisso, aliança, acordo. O que você firma agora tem peso duradouro."],
  ["Os Livros","Um segredo ainda fechado. Nem tudo foi revelado a você."],
  ["A Carta","Uma mensagem esclarece o que a dúvida embaralhou. Fique atento ao que chega por escrito."],
  ["O Cigano","Um homem tem papel importante nessa história. Observe as intenções, não as palavras."],
  ["A Cigana","Uma mulher tem papel importante nessa história. Ela sabe mais do que demonstra."],
  ["Os Lírios","Paz depois da tempestade. Maturidade para lidar com o que antes te derrubava."],
  ["O Sol","Sucesso e vitalidade. A fase pesada está perdendo força."],
  ["A Lua","Reconhecimento e intuição. Preste atenção nos seus sonhos, eles estão falando."],
  ["A Chave","A solução existe e está mais perto do que parece. A porta abre para quem procura a fechadura certa."],
  ["Os Peixes","Dinheiro e abundância em movimento. Organize o que entra antes de aumentar o que sai."],
  ["A Âncora","Estabilidade conquistada. Firme o que está dando certo antes de buscar o próximo."],
  ["A Cruz","Um peso que parece destino. Nem toda cruz é sua para carregar."]
];

const POSICOES = ["SEU MOMENTO", "O QUE PEDE ATENÇÃO", "O CAMINHO"];
const N_MESA = 12;

let nome = "", mesa = [], escolhidas = [];

const $ = s => document.querySelector(s);

function abrirTarot(){
  escolhidas = [];
  $("#tarot-inicio").hidden = false;
  $("#tarot-mesa").hidden = true;
  $("#tarot-resultado").hidden = true;
  $("#tarot-nome").value = "";
  $("#tarot-overlay").classList.add("aberto");
  document.body.style.overflow = "hidden";
  setTimeout(()=>$("#tarot-nome").focus(), 250);
}
function fecharTarot(){
  $("#tarot-overlay").classList.remove("aberto");
  document.body.style.overflow = "";
}

function iniciarMesa(){
  nome = $("#tarot-nome").value.trim();
  if(!nome){ $("#tarot-nome").focus(); return; }
  const idx = [...CARTAS.keys()];
  for(let i = idx.length-1; i > 0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  mesa = idx.slice(0, N_MESA);
  escolhidas = [];

  const grid = $("#tarot-grid");
  grid.innerHTML = "";
  mesa.forEach((ci, i) => {
    const c = document.createElement("button");
    c.className = "tcard";
    c.style.animationDelay = (i*45)+"ms";
    c.setAttribute("aria-label","Carta virada");
    c.innerHTML = '<span class="tcard-face tcard-verso"></span>';
    c.addEventListener("click", () => escolher(c, ci));
    grid.appendChild(c);
  });
  $("#tarot-quem").textContent = nome.split(" ")[0].toUpperCase();
  $("#tarot-conta").textContent = "ESCOLHA 3 CARTAS";
  $("#tarot-inicio").hidden = true;
  $("#tarot-mesa").hidden = false;
}

function escolher(el, ci){
  if(el.classList.contains("sel") || escolhidas.length >= 3) return;
  el.classList.add("sel");
  escolhidas.push(ci);
  const falta = 3 - escolhidas.length;
  $("#tarot-conta").textContent = falta ? `FALTA${falta>1?"M":""} ${falta}` : "LENDO AS CARTAS";
  if(escolhidas.length === 3) setTimeout(revelar, 650);
}

function revelar(){
  const wrap = $("#tarot-cartas-final");
  wrap.innerHTML = "";
  escolhidas.forEach((ci, i) => {
    const [titulo, msg] = CARTAS[ci];
    const bloco = document.createElement("div");
    bloco.className = "tleitura";
    bloco.style.animationDelay = (i*260)+"ms";
    bloco.innerHTML =
      `<p class="tag">${POSICOES[i]}</p>
       <h3>${titulo.toUpperCase().replace(/^(O |A |AS |OS )(.+)$/, "$1<b>$2</b>")}</h3>
       <p>${msg}</p>`;
    wrap.appendChild(bloco);
  });
  $("#tarot-saudacao").textContent = nome.split(" ")[0] + ", as cartas falaram.";
  $("#tarot-mesa").hidden = true;
  $("#tarot-resultado").hidden = false;
  $("#tarot-resultado").scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  $("#abrir-tarot").addEventListener("click", abrirTarot);
  $("#tarot-fechar").addEventListener("click", fecharTarot);
  $("#tarot-comecar").addEventListener("click", iniciarMesa);
  $("#tarot-refazer").addEventListener("click", abrirTarot);
  $("#tarot-nome").addEventListener("keydown", e => { if(e.key === "Enter") iniciarMesa(); });
  $("#tarot-overlay").addEventListener("click", e => { if(e.target.id === "tarot-overlay") fecharTarot(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") fecharTarot(); });
});

/* reveal dos cards de consulta ao rolar */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".cards .card");
  if(!("IntersectionObserver" in window)){ cards.forEach(c=>c.classList.add("vis")); return; }
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if(e.isIntersecting){
        const i = [...cards].indexOf(e.target);
        setTimeout(()=>e.target.classList.add("vis"), (i%3)*110);
        io.unobserve(e.target);
      }
    });
  }, {threshold:.18});
  cards.forEach(c => io.observe(c));
});
