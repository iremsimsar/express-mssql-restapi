var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
 
require('./app/router/router.js')(app);

const db = require('./app/config/db.config.js');

const Role = db.role;
  
// force: true => tablolar her program çalıştırıldığında baştan oluşturuluyor.
// force: false => tablolar eğer önceden yok iseler program çalıştırıldığında ilk defa oluşturuluyor.

db.sequelize.sync({force: true}).then(() => {
  console.log('create table sync { force: true }');
  initial();
});
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
var server = app.listen(3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})


function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	
	Role.create({
		id: 2,
		name: "ADMIN"
	});
	
	Role.create({
		id: 3,
		name: "PM"
	});
}