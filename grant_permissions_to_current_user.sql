-- Donner les permissions à l'utilisateur actuel (houcinefarhane)
GRANT ALL PRIVILEGES ON DATABASE crenoz TO houcinefarhane;
GRANT ALL PRIVILEGES ON SCHEMA public TO houcinefarhane;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO houcinefarhane;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO houcinefarhane;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO houcinefarhane;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO houcinefarhane;
