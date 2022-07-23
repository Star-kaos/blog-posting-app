const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Article extends Sequelize.Model { }
    Article.init({
        title: Sequelize.STRING,
        authorfirstname: Sequelize.STRING,
        authorlastname: Sequelize.STRING,
        authoremail: Sequelize.STRING,
        description: Sequelize.STRING,
        body: Sequelize.TEXT
    },
        {
            timestamps: false,
            sequelize,
            freezeTableName: false
        });

    return Article;
};