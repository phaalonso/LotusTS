const { WarframeDrop } = require('./services/api');

module.exports = {
    name: 'drop',
    description: 'Give the drop location of the item',
    args: true,
    usage: '<item>',
    async execute(message, args) {
        const itemName = args.join('_').toLowerCase();
        console.log('Drops', itemName);
        WarframeDrop();
    },
};