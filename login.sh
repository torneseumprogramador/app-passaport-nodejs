#!/bin/bash

# Fazer login e obter o token
curl -s -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password"}'
