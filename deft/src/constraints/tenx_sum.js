import Sum from './sum';

export default class TenXSum extends Sum {
  constructor(a, b) {
    super(a,b);
  }

  orig_sum() {
    return super.compute();
  }

  compute() {
    return (this.a + this.b) * 10;
  }
}