const express = require ('express') //ukljucujemo gotovu biblioteku koja dolazi sa node-om -> http
const cors=require('cors')

const server= express()	
server.use(cors())

server.use(express.json())


const zahtjevInfo = (req, res, next) => {
    console.log('Metoda:', req.method)
    console.log('Putanja:', req.path)
    console.log('Tijelo:', req.body)
    console.log('---')
    next() //middleware funkcije su ulancane i trebala bi jedna kaz zavrsi svoj zahtjev poslat drugoj itd 
    //next je referenca na iducu middleware f-ju odnosno mi smo gotovi sa svojim i prepustamo req i res drugoj, a ako nema
    //onda zahtjev ide na root
  }
   
  server.use(zahtjevInfo)
	
server.post('/api/poruke', (req, res) => {
 
    const podatak = req.body
    if(!podatak.sadrzaj){
      return res.status(400).json({
        error: 'Nedostaje sadržaj'
      })
    }
    
    const poruka = {
      sadrzaj: podatak.sadrzaj,
      vazno: podatak.vazno || false,
      datum: new Date(),
      id: generirajId()
    }
    poruke = poruke.concat(poruka)
    
    res.json(poruke)
  })
  	
const generirajId = () => {
    const maxId = poruke.length > 0
      ? Math.max(...poruke.map(p => p.id))
      : 0
    return maxId + 1
  }
let poruke = [
    {
      id: 1,
      sadrzaj: 'HTML je jednostavan',
    },
    {
      id: 2,
      sadrzaj: 'React koristi JSX sintaksu',
    },
    {
      id: 3,
      sadrzaj: 'GET i POST su najvaznije metode HTTP protokola',
    }
  ]
  //rute pisemo koje ce nam server osluskivati
 server.get('/',(req,res)=>{ //get prima 2 parametre : 1.adresu koju osluskujemo, 2.funkcija- koja ce se pozvati kada neko posalje get zahtjev na ovu adresu
    //ako neko posalje upit mi cemo odgovorit samo sa pozdravom -->
  res.send('<h1>Pozdrav od Express i nodemona posluzitelja</h1>')
 })
 server.get('/api/poruke/', (req,res)=>{ //ako nam napise na slj url -- ovo mu je odgovor
     res.json(poruke) //poruku pretvori u json /zgodno kod expressa
  })
 
 server.get('/api/poruke/:id', (req,res)=>{ //ako nam napise na slj url -- ovo mu je odgovor
   const id=Number(req.params.id)
   const poruka=poruke.find(p=> p.id===id)
   if(poruka)
   {
    res.json(poruka) 
   } 
   else{
       res.status(404).end() //ako pogrijesimo url i slicno da ne vraca 200 ok vec error 404
   }
 })
 //doslovno samo prominili tip zahtjeva iz get u delete i izminili sto nam treba
 server.delete('/api/poruke/:id', (req, res) => {  
     const id = Number(req.params.id)  
     poruke = poruke.filter(p => p.id !== id)   
     res.status(204).end()}) //no content status--app.delete('/api/poruke/:id', (req, res) => {  const id = Number(req.params.id)  poruke = poruke.filter(p => p.id !== id)   res.status(204).end()})

     //middleware za nezeljenu rutu
     const nepoznataRuta = (req, res) => {
        res.status(404).send({ error: 'nepostojeca ruta' })
      }
       
      	
server.put('/api/poruke/:id', (req, res) => {
  const objekt = req.body
  const id = Number(req.params.id)
  poruke = poruke.map(p => p.id !== id ? p : objekt )  
  res.json(objekt)
})
      server.use(nepoznataRuta)
// //funkciji za stvaranje servera moramo poslati metodu koja ce se pozvati kada nas server dobije neki zahtjev
// const server = http.createServer((req,res)=>{ //request i response, mijenjamo samo response objekt i to je ono sto korisnik dobija
// res.writeHead(200, {'Content-Type' :'application/json'}) //vracamo obican tekst kao odgovor
// res.end(JSON.stringify(poruke)) //pretvaramo u json 
// //kraj zahtjeva
// })
//sad smo napravili server treba jos par detalja
//port na kojem ce server slusati 
const port=3001
server.listen(port,()=> console.log(`Posluzitelj slusa na portu ${port}`)) //callback funkcija koja ce se pozvati kad se pokrene
