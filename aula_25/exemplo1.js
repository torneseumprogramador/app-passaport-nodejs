console.log('Current working directory:', process.cwd());
console.log('Process ID:', process.pid);
console.log('Memory usage:', process.memoryUsage());
console.log('Environment:', process.env.NODE_ENV);
console.log('Node version:', process.version);

// Exemplo de listener para eventos de saída
process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
});

// Para finalizar o processo manualmente e testar o listener:
process.exit(0);
