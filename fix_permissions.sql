-- Script pour donner les permissions nécessaires
-- À exécuter dans psql postgres

-- Se connecter à la base crenoz
\c crenoz

-- Donner toutes les permissions au schéma public
GRANT ALL PRIVILEGES ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;

-- Si vous utilisez un autre utilisateur, remplacez 'postgres' par votre nom d'utilisateur
