module.exports = (err, req, res, next) => {
  // Do logging and user-friendly error message display
  console.error(err)
  res
    .status(500)
    .send(err.message)
}