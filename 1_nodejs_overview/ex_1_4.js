const t1 = setTimeout(() => { }, 1_000_000);
const t2 = setTimeout(() => { }, 2_000_000);

t1.unref();
clearTimeout(t2);
