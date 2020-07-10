const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ROLEs = config.ROLEs; 
const User = db.user;
const Role = db.role;

checkDuplicateUserNameOrEmail = (req, res, next) => {
	// -> Kullanıcı adının var olup olmadığını kontrol et
	User.findOne({
		where: {
			username: req.body.username
		} 
	}).then(user => {
		if(user){
			console.log(req.body.username);
			res.status(400).send("Hata -> Bu kullanıcı adı kullanılmakta!");
			return;
		}
		
		// -> Mailin var olup olmadığını kontrol et
		User.findOne({ 
			where: {
				email: req.body.email
			} 
		}).then(user => {
			if(user){
				res.status(400).send("Hata -> Bu mail kullanılmakta!");
				return;
			}
				
			next();
		});
	});
}

checkRolesExisted = (req, res, next) => {	
	
	console.log(123);
	for(let i=0; i<req.body.roles.length; i++){
		if(!ROLEs.includes(req.body.roles.toUpperCase())){
			res.status(400).send("Hata -> Böyle bir rol yok = " + req.body.roles);
			return;
		}
		console.log(1234);
	}
	console.log("werewer");
	next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;