import axios from "axios"
import screenshot from "screenshot-desktop"
import sharp from "sharp"
import fs from "fs"
import dotenv from "dotenv"
import config from "./config.json" assert { type:"json" }

dotenv.config()

const { TENANT, CLIENT_ID, CLIENT_SECRET } = process.env

async function token(){
 const r = await axios.post(
  `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/token`,
  new URLSearchParams({
   client_id:CLIENT_ID,
   scope:"https://graph.microsoft.com/.default",
   client_secret:CLIENT_SECRET,
   grant_type:"client_credentials"
  })
 )
 return r.data.access_token
}

async function capturarArea(area,nome){
 const temp="temp.png"
 await screenshot({ filename:temp })

 await sharp(temp)
  .extract({ left:area.x, top:area.y, width:area.w, height:area.h })
  .toFile(nome)

 fs.unlinkSync(temp)
}

async function uploadImagem(token,file){
 const buffer=fs.readFileSync(file)

 const res=await axios.post(
  "https://graph.microsoft.com/v1.0/me/drive/root:/temp.png:/content",
  buffer,
  { headers:{ Authorization:`Bearer ${token}` } }
 )

 return res.data["@microsoft.graph.downloadUrl"]
}

async function enviar(chatId,texto,imgUrl,token){
 await axios.post(
  `https://graph.microsoft.com/v1.0/chats/${chatId}/messages`,
  {
   body:{
    contentType:"html",
    content:`${texto}<br><img src="${imgUrl}"/>`
   }
  },
  { headers:{ Authorization:`Bearer ${token}` } }
 )
}

async function executar(){
 const tk=await token()

 for(const op of config){
  const nome=`${op.nome}.png`

  await capturarArea(op.area,nome)

  const url=await uploadImagem(tk,nome)

  await enviar(op.chatId,op.texto,url,tk)

  fs.unlinkSync(nome)
 }
}

async function loop(){
 while(true){
  await executar()
  await new Promise(r=>setTimeout(r,3600000))
 }
}

loop()