// Contrôleur pour la route "hello world" de votre API
function sayHello(req, res) {
    res.json({ message: 'Hello World' });
}

module.exports = {
    sayHello
};
