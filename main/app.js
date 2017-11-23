var app = require('fastify')()

app.get('/', (req,res) => {
    res.send({
        msg: 'main'
    })
})

app.listen(3000, function(err) {
    if(err) throw err
    console.log(`server is listening on port 3000`)
})