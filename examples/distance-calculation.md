# Exemplo de Uso do Sistema de Cálculo de Distâncias

## 1. Cadastrar Cliente com Coordenadas

```bash
POST /clients/signup
{
  "userClient": "joao123",
  "passwordClient": "senha123",
  "nameClient": "João Silva",
  "emailClient": "joao@email.com",
  "cpfClient": "123.456.789-00",
  "addressClient": "Rua das Flores, 123, Centro, São Paulo - SP",
  "latitudeClient": -23.5505,
  "longitudeClient": -46.6333,
  "phoneClient": "(11) 99999-9999"
}
```

## 2. Calcular Distância para uma Empresa

```bash
POST /clients/calculate-distance
{
  "clientId": "uuid-do-cliente",
  "companyId": "uuid-da-empresa",
  "maxDistance": 10
}
```

## Resposta Esperada

```json
{
  "clientId": "uuid-do-cliente",
  "companyId": "uuid-da-empresa",
  "distance": 5.2,
  "estimatedDeliveryTime": 18,
  "deliveryCost": 15.4,
  "isWithinRange": true,
  "clientAddress": "Rua das Flores, 123, Centro, São Paulo - SP",
  "companyAddress": "Endereço da empresa",
  "clientCoordinates": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "companyCoordinates": {
    "latitude": -23.5505,
    "longitude": -46.6333
  }
}
```

## 3. Fórmula de Cálculo de Distância

O sistema usa a **Fórmula de Haversine** para calcular a distância real entre dois pontos na Terra:

```
a = sin²(Δφ/2) + cos(φ1) × cos(φ2) × sin²(Δλ/2)
c = 2 × atan2(√a, √(1−a))
d = R × c
```

Onde:
- φ = latitude em radianos
- λ = longitude em radianos
- R = raio da Terra (6.371 km)
- d = distância em quilômetros

## 4. Cálculo de Custo de Entrega

- **Taxa base**: R$ 5,00
- **Taxa por km**: R$ 2,00
- **Exemplo**: Para 5,2 km = R$ 5,00 + (5,2 × R$ 2,00) = R$ 15,40

## 5. Tempo Estimado de Entrega

- **Até 5 km**: 15 minutos
- **Acima de 5 km**: +3 minutos por km adicional
- **Exemplo**: Para 5,2 km = 15 + (0,2 × 3) = 15,6 ≈ 18 minutos

## 6. Validações

- Cliente deve existir
- Cliente deve ter coordenadas (latitude e longitude)
- Distância máxima é opcional
- Coordenadas devem estar nos ranges válidos:
  - Latitude: -90 a 90
  - Longitude: -180 a 180

## 7. Próximos Passos

Para implementar completamente:

1. **Integrar com repositório de empresas** para buscar coordenadas reais
2. **Adicionar geocoding** para converter endereços em coordenadas
3. **Implementar cache** para coordenadas frequentemente consultadas
4. **Adicionar validação** de endereços brasileiros
5. **Implementar busca de empresas próximas** por raio de distância
