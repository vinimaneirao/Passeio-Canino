//fisica
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var engine, world;

//estado de jogo
var estadodejogo = "menu";

//sprite do cachorro
var cachorro;

//imagens cachorro
var carameloesq, caramelodir, pugesq, pugdir, huskyesq, huskydir;

//coisas da loja
var pugamostra, huskyamostra, biscoitopug, biscoitiohusky;
var loja;
var botaopug, botaohusky;
var estadopug = "livre";
var estadohusky = "livre";

//biscoitinhos
var biscoitos = 0;
var biscoitosimg;

var avisobis1 = 0;
var avisobis2 = 0;

//background
var back;

//botões menu
var botaoplay, botaoloja;

//blocos do jogo
var blocoinicio, blocofim;
var bloco1, bloco2, bloco3, bloco4, bloco5;
var blocoMovimento1, blocoMovimento2;
var blocoinvisivel;
var biscoito1, biscoito2;

//raça do cachorro
raca = "caramelo";

//cocozinho
var coco, grupococo, cocoimg;

//bandeirinha fim
var bandeira;


function adquirirpug(){
  if (estadodejogo == "loja" && estadopug == "livre" && biscoitos >= 2 && botaopug.mousePressed(()=>{}))
   //estado do pug
    estadopug = "comprado";

    //pagamento
    biscoitos = biscoitos - 2;
    
    cachorro.addImage(pugdir);

   raca = "pug"


}

function adquirirhusky(){
  if (estadodejogo == "loja" && estadohusky == "livre" && biscoitos >= 4 && botaohusky.mousePressed(()=>{})){
    
    //estado do husky
    estadohusky = "comprado";

    //pagamento
    biscoitos = biscoitos - 4;

    cachorro.addImage(huskydir);

   raca = "husky";
  }
}


function sairloja(){
 
  //voltar pro menu
  estadodejogo = "menu";


}


function preload(){

  //fotos caramelo
  carameloesq = loadImage("imagens/carameloesq.png");
  caramelodir = loadImage("imagens/caramelodir.png");

  //fotos pug
  pugesq = loadImage("imagens/pugesq.png");
  pugdir = loadImage("imagens/pugdir.png");

  //fotos husky
  huskyesq = loadImage("imagens/huskyesq.png");
  huskydir = loadImage("imagens/huskydir.png");

  //imagem biscoito
  biscoitosimg = loadImage("imagens/biscoito.png");

  //background
  back = loadImage("imagens/parque.jpg");

  //cocô
  cocoimg = loadImage("imagens/cocô.png");

  //bandeira
  bandeira = loadImage("imagens/bandeira.png");

}

function setup() {
  createCanvas(1200,600);


  //grupo do cocô
  grupococo = new Group();
  //mostrar cocôs
  for (var i = 20; i < 920; i=i+40){
    var coco = createSprite(i, 280, 20, 20);
   coco.addImage(cocoimg);
   coco.scale = 0.2
   grupococo.add(coco);
  }


  //coisas da física
  engine = Engine.create();
  world = engine.world;

  //cachorro
  cachorro = createSprite(1000,120,50,50);
  cachorro.addImage(caramelodir);
  cachorro.scale = 0.47;
  cachorro.visible = false;
  cachorro.debug = true;
  cachorro.setCollider("rectangle", 0,0,210,190);

  //botões
  botaoplay = createButton("JOGAR");
  botaoplay.position(545,280);

  botaoloja = createButton("LOJA");
  botaoloja.position(550,320);

  //coisas da loja
  loja = createSprite(600,300,600,300);
  loja.shapeColor = "rgb(0,200,200)";
  
  pugamostra = createSprite(400,300);
  pugamostra.addImage(pugdir);
  pugamostra.scale = 0.8;

  huskyamostra = createSprite(800,300);
  huskyamostra.addImage(huskyesq);
  huskyamostra.scale = 0.7;

  biscoitohusky = createSprite(670,325);
  biscoitohusky.addImage(biscoitosimg);
  biscoitohusky.scale = 0.2

  biscoitopug = createSprite(510,325);
  biscoitopug.addImage(biscoitosimg);
  biscoitopug.scale = 0.2

  botaopug = createButton("COMPRAR/SELECIONAR");
  botaopug.position(320,400);
  botaopug.mouseClicked(adquirirpug);


  botaohusky = createButton("COMPRAR/SELECIONAR");
  botaohusky.position(720,400);
  botaohusky.mouseClicked(adquirirhusky);


  botaosairloja = createButton("X");
  botaosairloja.position(870,155);
  botaosairloja.mouseClicked(sairloja);


  //blocos jogo
  bloco1 = new blocos(800,170,150,20,"green");
  bloco7 = new blocos(1000,140,70,20,"green");
  bloco2 = new blocos(1050,410,110,20,"green");
  bloco3 = new blocos(900,470,90,20,"green");
  bloco4 = new blocos(780,540,100,20,"green");
  bloco5 = new blocos(300,570,100,20,"green");
  bloco8 = new blocos(310,420,90,20,"green");
  blocoinicio = new blocos(100,150,170,20,"yellow");
  blocofim = new blocos(0,510,350,20,"yellow");
  blocococo = new blocos(100,300,1700,20,rgb(75, 54, 33));


  //blocos invisiveis
  bloco1in = createSprite(800,170,150,20);
  bloco7in = createSprite(1000,140,70,20);
  bloco2in = createSprite(1050,410,110,20);
  bloco3in = createSprite(900,470,90,20);
  bloco4in = createSprite(780,540,100,20);
  bloco5in = createSprite(300,570,100,20);
  bloco8in = createSprite(310,420,90,20);

  blocoMovimento1in = createSprite(400,200,120,20);
  blocoMovimento1in.shapeColor = "blue";
  blocoMovimento2in = createSprite(500,500,110,20);
  blocoMovimento2in.shapeColor = "blue";

  blocoinicioin = createSprite(100,150,170,20);
  blocofimin = createSprite(0,510,350,20);
  blocococoin = createSprite(100,300,1700,20);

  
  //velocidade movimento blocos
  blocoMovimento1in.velocityX = 2;
  blocoMovimento2in.velocityX = 2;

  //sai blocos
  bloco1in.visible = false;
  bloco2in.visible = false;
  bloco3in.visible = false;
  bloco4in.visible = false;
  bloco5in.visible = false;
  bloco7in.visible = false;
  bloco8in.visible = false;
  blocococoin.visible = false;
  blocoinicioin.visible = false;
  blocofimin.visible = false;
  blocoMovimento1in.visible = false;
  blocoMovimento2in.visible = false;
 


  //biscoitos
  biscoito1 = createSprite(1100,120,20,20);
  biscoito1.addImage(biscoitosimg);
  biscoito1.scale = 0.2;
  biscoito1.visible = false;

  biscoito2 = createSprite(300,400,90,20);
  biscoito2.addImage(biscoitosimg);
  biscoito2.scale = 0.2;
  biscoito2.visible = false;

  //coisas pra cair
  Engine.run(engine);

}

function draw() {
  background(back);

  drawSprites();

  stroke("white");
  fill("black");
  textSize(20);
  text("Biscoitos: " + biscoitos, 1070,50);

  noStroke();

  if (estadodejogo == "menu"){
 
    //paradinho
    cachorro.x = 130;
    cachorro.y = 100;
    
    blocoMovimento1in.x = 400;
    blocoMovimento1in.y = 200;
    blocoMovimento2in.x = 500;
    blocoMovimento2in.y = 500;

    //reinicia biscoito
    avisobis1 = 0;
    avisobis2 = 0;

    //título
    textSize (60);
    fill("black");
    stroke("white");
    text("Passeio Canino :)", 350,120);

    //esconder loja
    grupococo.setVisibleEach(false);
    pugamostra.visible = false;
    huskyamostra.visible = false;
    loja.visible = false;
    biscoitohusky.visible = false;
    biscoitopug.visible = false;
    botaohusky.hide();
    botaopug.hide();
    botaosairloja.hide();

    //aparecer de volta botoes menu
    botaoloja.show();
    botaoplay.show();


    //Se clicar nos botoes
    botaoplay.mousePressed(()=>{
      
      //esconder botoes
      botaoplay.hide();
      botaoloja.hide();

      //estadode jogo
      estadodejogo = "jogo";
    })

    botaoloja.mousePressed(()=>{
      
      //esconder botoes
      botaoplay.hide();
      botaoloja.hide();

      //estadode jogo
      estadodejogo = "loja";
      
      
    })

  }

  if (estadodejogo == "loja"){

    //textos como titulos e numeros(preços)
    textSize (40);
    fill("black");
    stroke("white");
    text("2", 500,300);

    textSize (40);
    fill("black");
    stroke("white");
    text("4", 660,300);

    textSize (40);
    fill("black");
    stroke("white");
    text("LOJA", 530,220);

    //mostrar loja
    grupococo.setVisibleEach(false);
    pugamostra.visible = true;
    huskyamostra.visible = true;
    loja.visible = true;
    biscoitohusky.visible = true;
    biscoitopug.visible = true;
    botaohusky.show();
    botaopug.show();
    botaosairloja.show();
  
  }

  if (estadodejogo == "jogo"){

    //mostrar cachorro e biscoitos e bandeira
    if(avisobis1 == 0){
      biscoito1.visible = true;
    }   
    if(avisobis2 == 0){
      biscoito2.visible = true;
    } 
    cachorro.visible = true;
    blocoMovimento1in.visible = true;
    blocoMovimento2in.visible = true;
    grupococo.setVisibleEach(true);
    image(bandeira,50,430,80,80);


    //mostrar os blocos
    bloco1.display();
    bloco7.display();
    bloco2.display();
    bloco3.display();
    bloco4.display();
    bloco5.display();
    bloco8.display();
    blocoinicio.display();
    blocofim.display();
    blocococo.display();

    //cachorro colidir
    /*cachorro.collide(bloco1in);
    cachorro.collide(bloco2in);
    cachorro.collide(bloco3in);
    cachorro.collide(bloco4in);
    cachorro.collide(bloco5in);*/
    cachorro.collide(blocococoin);
    /*cachorro.collide(bloco7in);
    cachorro.collide(bloco8in);
    cachorro.collide(blocoinicioin);
    cachorro.collide(blocofimin);
    cachorro.collide(blocoMovimento1in);
    cachorro.collide(blocoMovimento2in);*/

  
    
    //gravidade
    cachorro.velocityY = cachorro.velocityY + 1;


    //toca biscoito1
    if(avisobis1 == 0 && cachorro.isTouching(biscoito1)){
      avisobis1 = avisobis1 + 1;
      biscoitos = biscoitos + 1;
      biscoito1.visible = false;
    }

    if(avisobis2 == 0 && cachorro.isTouching(biscoito2)){
      avisobis2 ++;
      biscoitos = biscoitos + 1;
      biscoito2.visible = false;
    }

    //morte
    if (cachorro.isTouching(blocococoin) || cachorro.y > 650){
      estadodejogo = "fimperde";
    }

    //morte
    if (cachorro.isTouching(blocofimin)){
      estadodejogo = "fimganha";
    }

    //bloco em movimento
    if (blocoMovimento1in.x <= 300 || blocoMovimento1in.x >= 640){
      blocoMovimento1in.velocityX = blocoMovimento1in.velocityX * -1;
    }

    if (blocoMovimento2in.x <= 430 || blocoMovimento2in.x >= 650){
      blocoMovimento2in.velocityX = blocoMovimento2in.velocityX * -1;
    }


    if(keyDown(LEFT_ARROW) && raca == "caramelo"){
      
      //cachorro imagem
      cachorro.addImage(carameloesq);

      cachorro.x = cachorro.x - 2.5;
    
    }

    if(keyDown(LEFT_ARROW) && raca == "pug"){
      
      //cachorro imagem
      cachorro.addImage(pugesq);

      //andar
      cachorro.x = cachorro.x - 2.5;
    }

    if(keyDown(LEFT_ARROW) && raca == "husky"){
      
      //cachorro imagem
      cachorro.addImage(huskyesq);

      //andar
      cachorro.x = cachorro.x - 2.5;
    }

    if(keyIsDown(RIGHT_ARROW) && raca == "caramelo"){
      
      //cachorro imagem
      cachorro.addImage(caramelodir);

      //andar
      cachorro.x = cachorro.x + 2.5;
    }

    if(keyDown(RIGHT_ARROW) && raca == "pug"){
      
      //cachorro imagem
      cachorro.addImage(pugdir);

      //andar
      cachorro.x = cachorro.x + 2.5;

    }

    if(keyDown(RIGHT_ARROW) && raca == "husky"){
      
      //cachorro imagem
      cachorro.addImage(huskydir);

      //andar
      cachorro.x = cachorro.x + 2.5;

    }

    if((cachorro.collide(bloco1in) 
    || cachorro.collide(bloco2in)
    || cachorro.collide(bloco3in)
    || cachorro.collide(bloco4in)
    || cachorro.collide(bloco5in)
    || cachorro.collide(bloco7in)
    || cachorro.collide(bloco8in)
    || cachorro.collide(blocofimin)
    || cachorro.collide(blocoinicioin)
    || cachorro.collide(blocoMovimento2in)
    || cachorro.collide(blocoMovimento1in)) && keyDown("space")){
      
      //pular
      cachorro.velocityY = - 15.5;

    }

  }

  if(estadodejogo == "fimperde"){
    fill("black");
    stroke("white");
    textSize(20);
    text("Você perdeu!", 600,200);
    
    fill("black");
    stroke("white");
    textSize(20);
    text("Aperte R para ir pro menu", 600, 400);

    if(keyDown("R")){
      estadodejogo = "menu";
    }

    grupococo.setVisibleEach(false);
    biscoito1.visible = false;
    biscoito2.visible = false;
    cachorro.visible = false;
    blocoMovimento1in.visible = false;
    blocoMovimento2in.visible = false;
    
  }

  if(estadodejogo == "fimganha"){
    fill("black");
    stroke("white");
    textSize(20);
    text("Você ganhou!", 600,200);
    
    fill("black");
    stroke("white");
    textSize(20);
    text("Aperte R para ir pro menu", 600, 400);

    if(keyDown("R")){
      estadodejogo = "menu";
    }
    
    grupococo.setVisibleEach(false);
    biscoito1.visible = false;
    biscoito2.visible = false;
    cachorro.visible = false;
    blocoMovimento1in.visible = false;
    blocoMovimento2in.visible = false;
    
  }

    
}
