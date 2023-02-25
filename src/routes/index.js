const { Router } = require('express');
const router = Router();
const fs = require('fs');

const json_eventos = fs.readFileSync('src/eventos.json', 'utf-8');
let eventos = JSON.parse(json_eventos);

// const eventos = []

router.get('/', (req, res)=>{
    res.render('index.ejs', {
        eventos
    })
});

router.get('/new-entry', (req, res)=>{
    res.render('new-entry.ejs');
})

router.post('/new-entry', (req, res)=>{
    const {titulo, usuario, fecha, imagen, info} = req.body
    // if(!titulo || !usuario || !fecha){
    //     res.status(400).send('Algún campo no esta completo')
    //     return
    // }
    let newEvento ={
        id:Math.random(),
        titulo,
        usuario,
        fecha,
        imagen,
        info
    }
    eventos.push(newEvento);

    const json_eventos = JSON.stringify(eventos);
    fs.writeFileSync('src/eventos.json', json_eventos, 'utf-8');

    res.redirect('/')
})

router.get('/delete/:id', (req, res) => {
    eventos = eventos.filter(evento => evento.id != req.params.id);
    const json_eventos = JSON.stringify(eventos);
    fs.writeFileSync('src/eventos.json', json_eventos, 'utf-8');
    res.redirect('/');
});


module.exports = router;