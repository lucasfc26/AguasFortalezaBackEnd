-- Migração para adicionar campos de coordenadas geográficas
-- Execute este script no seu banco de dados PostgreSQL

-- Adicionar campos de latitude e longitude na tabela client_info
ALTER TABLE client_info 
ADD COLUMN latitude_client DECIMAL(10,8) NULL,
ADD COLUMN longitude_client DECIMAL(11,8) NULL;

-- Adicionar campos de latitude e longitude na tabela wholesale_company
ALTER TABLE wholesale_company 
ADD COLUMN latitude_company DECIMAL(10,8) NULL,
ADD COLUMN longitude_company DECIMAL(11,8) NULL;

-- Criar índices para melhorar performance de consultas por coordenadas
CREATE INDEX idx_client_info_coordinates ON client_info(latitude_client, longitude_client);
CREATE INDEX idx_wholesale_company_coordinates ON wholesale_company(latitude_company, longitude_company);

-- Criar índice espacial para consultas de proximidade (opcional, requer extensão PostGIS)
-- CREATE EXTENSION IF NOT EXISTS postgis;
-- CREATE INDEX idx_client_info_geom ON client_info USING GIST (ST_SetSRID(ST_MakePoint(longitude_client, latitude_client), 4326));
-- CREATE INDEX idx_wholesale_company_geom ON wholesale_company USING GIST (ST_SetSRID(ST_MakePoint(longitude_company, latitude_company), 4326));

-- Comentários para documentar os campos
COMMENT ON COLUMN client_info.latitude_client IS 'Latitude do endereço do cliente (decimal degrees, -90 a 90)';
COMMENT ON COLUMN client_info.longitude_client IS 'Longitude do endereço do cliente (decimal degrees, -180 a 180)';
COMMENT ON COLUMN wholesale_company.latitude_company IS 'Latitude do endereço da empresa (decimal degrees, -90 a 90)';
COMMENT ON COLUMN wholesale_company.longitude_company IS 'Longitude do endereço da empresa (decimal degrees, -180 a 180)';
