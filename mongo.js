const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:admin@cluster0.k9a0j.mongodb.net?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(function(err, c) {
    const db = client.db("games");
    
    db.command({ping: 1}, function(err, result){
        if(!err){
            console.log("Подключение с сервером успешно установлено");
            console.log(result);
        }
        // Закрываем подключение
        client.close();
        console.log("Подключение закрыто");
    });
});
