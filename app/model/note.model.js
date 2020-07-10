module.exports = (sequelize, Sequelize) => {
	const Note = sequelize.define('notes', {
		title: {
			type: Sequelize.STRING,
			required: true
		},
		detail: {
			type: Sequelize.STRING
		},
	});
	return Note;
}