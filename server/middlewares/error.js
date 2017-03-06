module.exports = (err, req, res, next) => {
  // Do logging and user-friendly error message display
  if(err)
  return res
    .status(500)
    .send(err.message)

  next()
}