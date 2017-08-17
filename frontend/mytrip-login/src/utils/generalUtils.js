const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
});

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
});

const eitherFunctionOrNot = fn =>
  (typeof fn === 'function') ? Right(fn) : Left(fn);

module.exports.Left = Left;
module.exports.Right = Right;
module.exports.eitherFunctionOrNot = eitherFunctionOrNot;
