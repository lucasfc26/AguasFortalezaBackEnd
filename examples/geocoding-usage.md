# Sistema de Geocoding - AguaFortaleza Backend

## 🚀 Funcionalidades Implementadas

### 1. **Geocoding Automático no Cadastro**
- Quando um cliente é cadastrado com endereço, o sistema automaticamente gera latitude e longitude
- Se as coordenadas já forem fornecidas, elas são usadas diretamente
- Fallback gracioso se o geocoding falhar

### 2. **Atualização Manual de Coordenadas**
- Endpoint para atualizar latitude/longitude manualmente
- Validação de ranges válidos (-90 a 90 para latitude, -180 a 180 para longitude)

### 3. **Atualização de Endereço**
- Endpoint para alterar o endereço do cliente
- Coordenadas são removidas quando o endereço é alterado (para evitar inconsistências)

## 📡 Endpoints da API

### **Geocoding de Endereços**
```bash
GET /maps/geocode?address=Rua das Flores, 123, São Paulo, SP
```

**Resposta:**
```json
{
  "latitude": -23.5505,
  "longitude": -46.6333,
  "formattedAddress": "Rua das Flores, 123 - São Paulo, SP, Brasil"
}
```

### **Validação de Coordenadas**
```bash
POST /maps/validate-coordinates
{
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

**Resposta:**
```json
{
  "isValid": true
}
```

### **Cálculo de Distância**
```bash
POST /maps/calculate-distance
{
  "lat1": -23.5505,
  "lon1": -46.6333,
  "lat2": -23.5505,
  "lon2": -46.6333
}
```

**Resposta:**
```json
{
  "distance": 0.0
}
```

## 👥 Endpoints de Clientes

### **Cadastro com Geocoding Automático**
```bash
POST /clients/signup
{
  "userClient": "joao123",
  "passwordClient": "senha123",
  "nameClient": "João Silva",
  "emailClient": "joao@email.com",
  "cpfClient": "123.456.789-00",
  "addressClient": "Rua das Flores, 123, São Paulo, SP"
}
```

**Resposta:**
```json
{
  "uuidClient": "uuid-gerado",
  "userClient": "joao123",
  "coordinates": {
    "latitude": -23.5505,
    "longitude": -46.6333
  }
}
```

### **Atualização Manual de Coordenadas**
```bash
PATCH /clients/{clientId}/coordinates
{
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

### **Atualização de Endereço**
```bash
PATCH /clients/{clientId}/address
{
  "address": "Nova Rua, 456, São Paulo, SP"
}
```

## 🔧 Configuração

### **1. Variável de Ambiente**
```bash
# .env
GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
```

### **2. Dependências**
```bash
npm install axios dotenv
npm install --save-dev @types/dotenv
```

### **3. Módulos Importados**
```typescript
// clients.module.ts
imports: [
  TypeOrmModule.forFeature([ClientInfo, PaymentClient]),
  SharedModule,
  MapsModule, // ← Importa o módulo de maps
]
```

## 🎯 Fluxo de Funcionamento

### **Cadastro de Cliente:**
1. Cliente envia dados incluindo endereço
2. Sistema verifica se coordenadas foram fornecidas
3. Se não, faz geocoding automático do endereço
4. Salva cliente com coordenadas geradas
5. Retorna dados incluindo coordenadas

### **Atualização de Coordenadas:**
1. Cliente envia novas coordenadas
2. Sistema valida ranges (-90 a 90, -180 a 180)
3. Atualiza banco de dados
4. Retorna cliente atualizado

### **Atualização de Endereço:**
1. Cliente envia novo endereço
2. Sistema atualiza endereço no banco
3. Remove coordenadas antigas (evita inconsistências)
4. Retorna cliente atualizado

## 🚨 Tratamento de Erros

### **Geocoding Falha:**
- Sistema continua funcionando sem coordenadas
- Log de warning é gerado
- Cliente é salvo sem coordenadas

### **Coordenadas Inválidas:**
- Validação de ranges antes de salvar
- Erro 400 se coordenadas estiverem fora dos ranges

### **API Key Inválida:**
- Erro 400 com mensagem clara
- Log de erro para debugging

## 🔮 Próximos Passos

### **1. Geocoding Automático na Atualização de Endereço**
```typescript
// Implementar no updateClientAddress
const geocodeResult = await this.mapsService.geocodeAddress(newAddress);
client.latitudeClient = geocodeResult.latitude;
client.longitudeClient = geocodeResult.longitude;
```

### **2. Cache de Coordenadas**
```typescript
// Implementar cache Redis para endereços frequentes
const cachedCoords = await this.redisService.get(`coords:${address}`);
```

### **3. Validação de Endereços Brasileiros**
```typescript
// Integrar com ViaCEP para validação
const viaCepData = await this.viaCepService.search(cep);
```

### **4. Geocoding para Empresas**
```typescript
// Aplicar o mesmo sistema para empresas
// companies.service.ts
```

## 📊 Exemplo de Uso Completo

### **1. Cadastrar Cliente**
```bash
POST /clients/signup
{
  "userClient": "maria123",
  "passwordClient": "senha123",
  "nameClient": "Maria Santos",
  "emailClient": "maria@email.com",
  "cpfClient": "987.654.321-00",
  "addressClient": "Av. Paulista, 1000, São Paulo, SP"
}
```

### **2. Verificar Coordenadas Geradas**
```bash
GET /clients/list
```

### **3. Calcular Distância para Empresa**
```bash
POST /clients/calculate-distance
{
  "clientId": "uuid-da-maria",
  "companyId": "uuid-da-empresa",
  "maxDistance": 10
}
```

### **4. Atualizar Endereço**
```bash
PATCH /clients/uuid-da-maria/address
{
  "address": "Rua Augusta, 500, São Paulo, SP"
}
```

### **5. Atualizar Coordenadas Manualmente**
```bash
PATCH /clients/uuid-da-maria/coordinates
{
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

## 🎉 Benefícios

✅ **Automatização**: Geocoding automático no cadastro
✅ **Flexibilidade**: Atualização manual de coordenadas
✅ **Validação**: Coordenadas sempre válidas
✅ **Consistência**: Endereço e coordenadas sempre sincronizados
✅ **Fallback**: Sistema funciona mesmo se geocoding falhar
✅ **Escalabilidade**: Arquitetura modular para futuras melhorias

---

**Sistema implementado e funcionando! 🚀**
