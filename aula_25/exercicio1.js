function listNumbers(...numbers) {
  const types = numbers.map(num => typeof num);
  const hasNonNumber = types.some(type => type !== 'number');

  if (hasNonNumber) {
      console.log('Invalid parameters:', types);
      /*
      0: Terminação bem-sucedida.
      1: Erro genérico; geralmente usado para indicar falhas inesperadas.
      2: Uso incorreto de comandos na linha de comando (como passar argumentos inválidos).
      3: Erro relacionado a argumentos inválidos de runtime.
      4: Erros relacionados ao sistema (não comum).
      5-126: Reservado para propósitos específicos conforme a aplicação decide.
      127: Comando não encontrado.
      128: Erro de sinal inválido.
      >128: Os valores acima de 128 geralmente indicam que o processo terminou devido a um sinal de interrupção (por exemplo, 128 + número_do_sinal).
      */
      process.exit(-4);
  } else {
      console.log('All parameters are numbers:', numbers);
  }
}

// Teste com parâmetros válidos e inválidos
// listNumbers(1, 2, 3, 'a', true); // Irá disparar o erro
listNumbers(1, 2, 3, 4, 5); // Irá exibir os números
