// src/lib/api/taskdemand.js

export function getAPIURL() {
  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('127.0.0.1')
  );

  return isLocal
    ? 'http://127.0.0.1:8000/api/agent/projeto/gerar'
    : 'https://straterkit-svelte.azurewebsites.net/api/agent/projeto/gerar';
}

export async function gerarEntregaveis(prompt) {
  const url = getAPIURL();

  const resposta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao gerar entregáveis: ${resposta.statusText}`);
  }

  return await resposta.json();
}
