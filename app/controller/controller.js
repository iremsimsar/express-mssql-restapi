const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const Note = db.note;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
// Veritabanına kullanıcı kaydı
console.log("Kayıt işlemi yapılıyor");
console.log(req.body.roles);
	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		Role.findAll({
			where: {
				name:  req.body.roles
				
			}
		}).then(roles => {
			var token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});
			user.setRoles(roles).then(() => {
				res.send({ auth: true, accessToken: token });
			});
		}).catch(err => {
			console.log("object");
			res.status(500).send("Error -> " + err);
		});
	}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}

exports.signin = (req, res) => {
	console.log("Giriş Yapılıyor...");


	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		// console.log(user);
		if (!user) {
			return res.status(400).send('Kullanıcı bulunamadı.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}

		var token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});

		res.status(200).send({ auth: true, accessToken: token });
	}).catch(err => {
		res.status(500).send('Hata -> ' + err);
		console.log(err);
	});
}

exports.userContent = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Kullanıcı Sayfasına Hoş Geldiniz",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Kullanıcı sayfasına erişiminiz yoktur.",
			"error": err
		});
	})
}

exports.adminBoard = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Admin Sayfasına Hoş Geldiniz",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Admin sayfasına erişiminiz yoktur.",
			"error": err
		});
	})
}


// note ekleme
exports.noteAdd = (req, res) => {
	// Veritabanına kullanıcı kaydı
	console.log("Processing func -> SignUp");

	Note.create({
		title: req.body.title,
		detail: req.body.detail,
	}).then(note => {
		res.send("Not başarıyla kaydedildi!");
	}).catch(err => {
		res.status(500).send("Hata! Error -> " + err);
	})
}

exports.noteList = (req, res) => {
	Note.findAll()
		.then(note =>
			res.json(note)
		)
}


// not görüntüleme fonksiyonu
exports.noteView = function (req, res) {
	Note.findOne({
		where: { id: req.params.id }
	}).then(note =>
		res.json(note)
	)
}


// not güncelleme fonksiyonu
exports.noteUpdate = function (req, res) {
	Note.update(
		{
			detail: req.body.detail,
			title: req.body.title,

		},
		{
			where: { id: req.params.id }
		}
	).then(note =>
		res.json(note)
	).catch(err => {
		res.status(500).send("Hata! Error -> " + err);
	})
}


// not silme fonksiyonu
exports.noteDelete = function (req, res) {
	Note.destroy({
		where: { id: req.params.id }
	}).then(note =>
		res.json("Kayıt başarıyla silindi.")
	)
}


exports.managementBoard = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Yönetim Paneli",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Yönetim paneline erişiminiz yoktur.",
			"error": err
		});
	})
}