const cluster = require('cluster');
console.log(`master pid=${process.pid}`);
cluster.setupMaster({
    exec: __dirname + '/ex_3_2_cluster_fibonacci.js'
});
cluster.fork();
cluster.fork();

cluster
    .on('disconnect', (worker) => {
        console.log('disconnect', worker.id)
    })
    .on('message', (worker, message) => {
        console.log(`Got message! worker:${worker.id}, message: ${message}`);
    })
    .on('exit', (worker, code, signal) => {
        console.log('exit', worker.id, code, signal);
    })
    .on('listening', (worker, { address, port }) => {
        console.log('listening', worker.id, `${address}:${port}`);
    });