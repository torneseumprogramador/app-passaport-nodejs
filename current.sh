#!/bin/bash

# Fazer login e obter o token
response=$(curl -s -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password"}')

# Extrair o token da resposta
token=$(echo $response | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

# Usar o token para acessar a rota protegida
curl -X GET http://localhost:3000/current -H "Authorization: Bearer $token"
