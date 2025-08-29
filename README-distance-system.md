# Sistema de Cálculo de Distâncias - AguaFortaleza Backend

## Visão Geral

Este sistema implementa um serviço robusto para calcular distâncias entre clientes e empresas (lojas) usando coordenadas geográficas. É ideal para aplicações de delivery, e-commerce local e serviços de proximidade.

## 🚀 Características Principais

- **Cálculo preciso de distâncias** usando a fórmula de Haversine
- **Estimativa de tempo de entrega** baseada na distância
- **Cálculo de custo de entrega** com taxas configuráveis
- **Validação de coordenadas** geográficas
- **Filtros por distância máxima** para otimizar entregas
- **Arquitetura modular** e extensível

## 📁 Estrutura do Projeto

```
src/
├── shared/
│   ├── services/
│   │   └── distance.service.ts      # Serviço principal de cálculos
│   └── shared.module.ts             # Módulo compartilhado
├── clients/
│   ├── entities/
│   │   └── client-info.entity.ts    # Entidade com coordenadas
│   ├── dtos/
│   │   ├── client-signup.dto.ts     # DTO com campos de coordenadas
│   │   ├── calculate-distance.dto.ts # DTO para cálculo de distância
│   │   └── distance-result.dto.ts   # DTO de resultado
│   ├── clients.service.ts           # Serviço com métodos de distância
│   ├── clients.controller.ts        # Controller com endpoints
│   └── clients.module.ts            # Módulo de clientes
└── companies/
    └── entities/
        └── wholesale-company.entity.ts # Entidade com coordenadas
```

## 🛠️ Instalação e Configuração

### 1. Executar Migração do Banco

```sql
-- Execute o arquivo migrations/add-coordinates-fields.sql
-- Este script adiciona os campos necessários ao banco
```

### 2. Verificar Dependências

O sistema usa apenas dependências padrão do NestJS. Não são necessárias bibliotecas externas para cálculos básicos.

### 3. Configurar Módulos

Certifique-se de que o `SharedModule` está sendo importado no `ClientsModule`.

## 📊 Como Funciona

### Fórmula de Haversine

O sistema calcula a distância real entre dois pontos na Terra usando coordenadas geográficas:

```typescript
// Exemplo simplificado da implementação
const R = 6371; // Raio da Terra em km
const dLat = toRadians(lat2 - lat1);
const dLon = toRadians(lon2 - lon1);

const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2);

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
const distance = R * c;
```

### Cálculo de Custo de Entrega

- **Taxa base**: R$ 5,00
- **Taxa por km**: R$ 2,00
- **Fórmula**: `custo = 5.00 + (distância × 2.00)`

### Tempo Estimado de Entrega

- **Até 5 km**: 15 minutos
- **Acima de 5 km**: +3 minutos por km adicional

## 🔧 Uso da API

### 1. Cadastrar Cliente com Coordenadas

```bash
POST /clients/signup
{
  "userClient": "usuario123",
  "passwordClient": "senha123",
  "nameClient": "Nome do Cliente",
  "emailClient": "cliente@email.com",
  "cpfClient": "123.456.789-00",
  "latitudeClient": -23.5505,
  "longitudeClient": -46.6333,
  "addressClient": "Endereço completo"
}
```

### 2. Calcular Distância

```bash
POST /clients/calculate-distance
{
  "clientId": "uuid-do-cliente",
  "companyId": "uuid-da-empresa",
  "maxDistance": 10
}
```

### 3. Resposta

```json
{
  "clientId": "uuid-do-cliente",
  "companyId": "uuid-da-empresa",
  "distance": 5.2,
  "estimatedDeliveryTime": 18,
  "deliveryCost": 15.4,
  "isWithinRange": true,
  "clientAddress": "Endereço do cliente",
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

## 🚀 Melhorias Futuras

### 1. Integração com APIs de Geocoding

```typescript
// Exemplo de integração com Google Maps
async getCoordinatesFromAddress(address: string): Promise<Coordinates> {
  const response = await this.googleMapsService.geocode(address);
  return {
    latitude: response.lat,
    longitude: response.lng
  };
}
```

### 2. Cache de Coordenadas

```typescript
// Implementar cache Redis para coordenadas
async getCachedCoordinates(address: string): Promise<Coordinates | null> {
  return await this.redisService.get(`coords:${address}`);
}
```

### 3. Busca de Empresas Próximas

```typescript
// Query otimizada para encontrar empresas em um raio
async findNearbyCompanies(lat: number, lon: number, radius: number) {
  return await this.companyRepo
    .createQueryBuilder('company')
    .where('ST_DWithin(ST_MakePoint(company.longitude, company.latitude), ST_MakePoint(:lon, :lat), :radius)', {
      lon, lat, radius
    })
    .getMany();
}
```

### 4. Validação de Endereços Brasileiros

```typescript
// Validação de CEP e endereços
async validateBrazilianAddress(address: string, cep: string): Promise<boolean> {
  const viaCepResponse = await this.viaCepService.search(cep);
  return viaCepResponse.erro !== true;
}
```

## 📈 Performance e Otimizações

### 1. Índices de Banco

```sql
-- Índices para consultas por coordenadas
CREATE INDEX idx_client_coordinates ON client_info(latitude_client, longitude_client);
CREATE INDEX idx_company_coordinates ON wholesale_company(latitude_company, longitude_company);
```

### 2. Cache de Resultados

```typescript
// Cache de cálculos de distância
@CacheKey('distance:${clientId}:${companyId}')
async calculateDistance(clientId: string, companyId: string) {
  // Implementação
}
```

### 3. Paginação para Grandes Volumes

```typescript
// Paginação para listas de empresas próximas
async findNearbyCompanies(
  lat: number, 
  lon: number, 
  radius: number,
  page: number = 1,
  limit: number = 20
) {
  // Implementação com paginação
}
```

## 🧪 Testes

### Teste Unitário do Serviço de Distância

```typescript
describe('DistanceService', () => {
  it('should calculate correct distance between two points', () => {
    const coord1 = { latitude: 0, longitude: 0 };
    const coord2 = { latitude: 0, longitude: 1 };
    
    const distance = service.calculateDistance(coord1, coord2);
    expect(distance).toBeCloseTo(111.19, 1); // ~111 km
  });
});
```

### Teste de Integração

```typescript
describe('Distance Calculation E2E', () => {
  it('should calculate distance between client and company', async () => {
    // Teste completo da API
  });
});
```

## 🔒 Segurança e Validação

### 1. Validação de Coordenadas

```typescript
// Validação de ranges válidos
@IsNumber()
@Min(-90)
@Max(90)
latitudeClient: number;

@IsNumber()
@Min(-180)
@Max(180)
longitudeClient: number;
```

### 2. Rate Limiting

```typescript
// Proteção contra spam de cálculos
@UseGuards(ThrottlerGuard)
@Throttle(10, 60) // 10 requests por minuto
async calculateDistance() {
  // Implementação
}
```

## 📚 Recursos Adicionais

- **Documentação da API**: Swagger/OpenAPI
- **Logs estruturados**: Winston ou Pino
- **Monitoramento**: Prometheus + Grafana
- **Alertas**: Para distâncias anômalas
- **Métricas**: Tempo de resposta, precisão dos cálculos

## 🤝 Contribuição

Para contribuir com melhorias:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Implemente as melhorias
4. Adicione testes
5. Submeta um Pull Request

## 📄 Licença

Este projeto está sob a licença [sua licença aqui].

---

**Desenvolvido para AguaFortaleza** 🚰💪
