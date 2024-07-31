#!/bin/bash

# Fazer login como admin e obter o token
response=$(curl -s -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password"}')

# Extrair o token da resposta
token=$(echo $response | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

# Imprimir o token
echo "Token JWT: $token"

# Usar o token para acessar a rota protegida /admin
echo "Acessando a rota protegida /admin..."
curl -X GET http://localhost:3000/admin -H "Authorization: Bearer $token"
