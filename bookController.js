// Import Book Model
const Book = require("./bookModel");

//Handling index actions
exports.index = function (req, res) {
  Book.find()
    .exec()
    .then((data) => res.status(200).json(data));
};

// Create book
exports.new = function (req, res) {
  let book = new Book();
  book.id = req.body.id ? req.body.id : book.id;
  book.title = req.body.title ? req.body.title : book.title;
  book.author = req.body.author ? req.body.author : book.author;

  //saving book and checking for errors
  book.save(function (err) {
    res.json({
      message: "New book created!",
      status: "ok",
      data: book,
    });
  });
};

// Handle view book info
exports.view = function (req, res) {
  Book.findById( req.params.id, function (err, book) {
    if (err) res.send(err);
    res.json({
      message: "book details loading..",
      data: book,
    });
  });
};

// Handle update note info
exports.update = function (req, res) {
  Book.findById(req.params.id, function (err, book) {
    if (err) res.send(err);

    book.title = req.body.title ? req.body.title : book.title;
  book.author = req.body.author ? req.body.author : book.author;

    // save the note and check for errors
    book.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "book Info updated",
        status: "ok",
        data: book,
      });
    });
  });
};

// Handle delete user
exports.delete = function (req, res) {
  Book.deleteOne(
    {
      id: req.params.id,
    },
    function (err, note) {
      if (err) res.send(err);

      res.json({
        status: "ok",
        message: "book deleted",
      });
    }
  );
};