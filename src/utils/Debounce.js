const Debounce = (fun, delay) => {
  let timer;
  return (...args) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => fun.apply(context, args), delay);
  }
};

export default Debounce;
