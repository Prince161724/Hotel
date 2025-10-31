const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // Main thread
  console.log("Main thread starting...");

  function parallelSum(array, numWorkers, callback) {
    const chunkSize = Math.ceil(array.length / numWorkers); // Array ko chunks mein divide
    const workers = [];
    const results = [];
    let completed = 0;

    for (let i = 0; i < numWorkers; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, array.length);
      const chunk = array.slice(start, end);

      const worker = new Worker(__filename); // New worker
      workers.push(worker);

      worker.postMessage(chunk); // Chunk bhej do

      worker.on('message', (partialSum) => {
        results[i] = partialSum; // Result store
        completed++;
        if (completed === numWorkers) {
          const totalSum = results.reduce((acc, curr) => acc + curr, 0); // Sab results add karo
          callback(null, totalSum);
          workers.forEach(w => w.terminate()); // Sab workers kill karo
        }
      });

      worker.on('error', (err) => callback(err)); // Error handling
    }
  }

  // Test
  const largeArray = Array.from({ length: 100000000 }, (_, i) => i); // Large array (0 to 99,999,999)
  console.log("Start parallel sum...");
  parallelSum(largeArray, 4, (err, result) => { // 4 workers use karo
    if (err) console.error("Error:", err);
    else console.log("Total sum:", result);
  });
  console.log("Main thread continues..."); // Non-blocking

} else {
  // Worker thread
  parentPort.on('message', (chunk) => {
    let sum = 0;
    for (let num of chunk) {
      sum += num; // Chunk ka sum calculate
    }
    parentPort.postMessage(sum); // Result bhej do
  });
}