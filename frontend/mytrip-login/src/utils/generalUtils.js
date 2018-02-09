const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x)
});

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x)
});

const eitherFunctionOrNot = fn =>
  typeof fn === 'function' ? Right(fn) : Left(fn);

const Sum = x => ({
  x,
  chain: f => f(x),
  concat: ({ x: y }) => Sum(x + y),
  fold: f => f(x),
  map: f => Sum(f(x))
});

Sum.empty = () => Sum(0);
Sum.of = x => Sum(x);

const compose = (...fs) => x => fs.reduceRight((g, f) => f(g), x);

const curry = f => (...xs) =>
  xs.length < f.length ? (...ys) => curry(f)(...xs, ...ys) : f(...xs);

const randomInRange = r => Math.floor(Math.random() * r.length);

const charAt = (s, i) => s.charAt(i);

const callTimes = (r, f, n) =>
  n <= 1 ? r.concat(f()) : callTimes(r.concat(f()), f, n - 1);

module.exports = {
  Left,
  Right,
  eitherFunctionOrNot,
  Sum,
  compose,
  curry,
  randomInRange,
  charAt,
  callTimes
};
