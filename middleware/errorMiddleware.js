function notFound(req, res, next) {
    res.status(404).json({ message: "Route not found" });
  }
  
  function errorHandler(err, req, res, next) {
    console.log("=== ERROR START ===");
    console.log(err);                 // покажет полный объект ошибки
    console.log("=== ERROR END ===");
    res.status(500).json({ message: err.message || "Server error" });
  }
  
  module.exports = { notFound, errorHandler };