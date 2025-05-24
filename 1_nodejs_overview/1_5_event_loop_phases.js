import fs from "fs";

function ex1() {
    setImmediate(() => console.log(1)); // 1(d). Added to check queue
    Promise.resolve().then(() => console.log(2)); // 2(c). Add to promise microtask queue
    process.nextTick(() => console.log(3)); // 3(b). Add to the next tick microtask queue
    fs.readFile('./1_5_event_loop_phases.js', () => { // 4. Placing its callback in the poll queue
        console.log(4); // 6(e). Directly printed
        setTimeout(() => console.log(5)); // 7(h). Added to timer queue
        setImmediate(() => console.log(6)); // 8(g). Added to check queue
        process.nextTick(() => console.log(7)); // 9(f). Added to next tick microtask queue 
    });
    console.log(8); //5(a). This get called and result it printed

    // Output should be in following order
    // 8(a)
    // 3(b)
    // 2(c)
    // 1(d)
    // 4(e)
    // 7(f)
    // 6(g)
    // 5(h)
}


// Async await in event loop
function ex2() {
    const sleep_st = (t) => new Promise((r) => setTimeout(r, t));
    const sleep_im = () => new Promise((r) => setImmediate(r));

    (async () => {
        setImmediate(() => console.log(1));
        console.log(2);
        await sleep_st(0);
        setImmediate(() => console.log(3));
        console.log(4);
        await sleep_im();
        setImmediate(() => console.log(5));
        console.log(6);
        await 1;
        setImmediate(() => console.log(7));
        console.log(8);
    })();

    // Should be in order
    // 2,1,4,3,6,8,5,7

}

// Equivalent to ex2 but with promises

function ex3() {
    setImmediate(() => console.log(1));
    console.log(2);
    Promise.resolve().then(() => {
        setTimeout(() => {
            setImmediate(() => console.log(3));
            console.log(4);
            Promise.resolve().then(() => {
                setImmediate(() => {
                    setImmediate(() => console.log(5));
                    console.log(6);
                    Promise.resolve().then(() => {
                        setImmediate(() => console.log(7));
                        console.log(8);
                    })
                })
            })
        })
    })
}

// ex3();

// const si_recursive = () => {
//     console.log('si_recursive');
//     return setImmediate(si_recursive)
// };
// si_recursive();
// setInterval(() => console.log(1), 10);