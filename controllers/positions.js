const Position = require('../models/positions');

module.exports.createPositions = (req, res) => {

    const { image, description, promocode, link, barcode,categories } = req.body;
    Position.create({ image, description, promocode, link, barcode , categories})
        .then((position) => {
            res.status(200).send({ data: position })
        })
        .catch((error) => {
            res.status(400).send({ message: error });
        })
}