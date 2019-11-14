exports.testMessage = async (req, res) => {
    return res
        .status(200)
        .send('Accounts List');
}