const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const app = express();


app.use(express.json());
app.use(cors());

//array que simula um banco de dados 
const USERS =[
    
    {id:"1", name:"Carlos",email:"carlos@exemple.com", password:"123456" },
    {id:"2", name:"Maria",email:"maria@exemple.com", password:"123456" },
    {id:"3", name:"Mario",email:"mario@exemple.com", password:"123456" },
    {id:"4", name:"Carla",email:"carla@exemple.com", password:"123456" },
    {id:"5", name:"Alex",email:"alex@exemple.com", password:"123456" }
];
//token com vcarios caracters
const TOKEN = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9';

//função que cria o token mais parrudo com as informações do TOKEN e dis dadis di usuário
function createToken(user){
    const token = jwt.sign({sub: user.id, useName: user.name}, TOKEN, {expiresIn:'2h'});
    console.log("token criado com sucesso");
    return token;
}

//midleware que faz a verificação se o token que vem do front end é valido
function auth(req,res,next){  
    //pega o cabeçario da requisição
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" "); //divide em dois
   
    //verifica se o token está correto
    if(type !== 'Bearer' || !token) return res.status(401).send("erro na verificação do token");
    try{       
        //verifica se o token está correto
        req.user = jwt.verify(token, TOKEN);
        next();

    }catch(error){
        console.log("Erro ao fazer requisição: ", error);
        return res.status(401).json({sucess: false, message:"erro na requisição"});
    }

}

app.get("/", (req,res)=>{
    res.status(200).send("conectado na api");
})

app.post("/api/login", (req,res)=>{
    try{
        console.log("Teste");
        const{login,password} = req.body;
        console.log("login: ",login);
        const user = USERS.find(u=>u.name === login && u.password === password);
        if(user){
            const token = createToken(user);
            console.log("usuário encontrado");
            return res.status(200).json({sucess:true, token: token});            
        }

         return res.status(401).json({sucess: false});
    }catch(error){
        console.log("Erro ao fazer requisição POST: ", error);
         return res.status(401).json({sucess:false, message: "erro ao fazer req post"});
    }
});

app.get("/api/users", auth, (req,res)=>{
    try{ 
        console.log("cheguei na api GET");       
         return res.status(200).json({sucess:USERS});
    }catch(error){
        console.log("erro ao fazer requicisão get: ", error);
        return res.status(401).json({sucess:false, message: "erro ao fazer req"});
    }
})


app.listen(3000 , ()=> console.log("Servidor rodando na porta 3000"))