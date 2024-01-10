const slash = (req, res) => {
    res.send({
        ok: true,
        message: 'connection established',
        username: req.decoded.username
    })

}

export { slash }