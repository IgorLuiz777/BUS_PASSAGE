/*
  # Configuração inicial do banco de dados

  1. Novas Tabelas
    - `users`: Armazena informações dos usuários
      - `id` (uuid, chave primária)
      - `email` (texto, único)
      - `full_name` (texto)
      - `phone` (texto)
      - `cpf` (texto, único)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `trips`: Armazena informações das viagens disponíveis
      - `id` (uuid, chave primária)
      - `origin` (texto)
      - `destination` (texto)
      - `departure_date` (timestamp)
      - `arrival_date` (timestamp)
      - `company` (texto)
      - `price` (decimal)
      - `available_seats` (inteiro)
      - `created_at` (timestamp)
    
    - `orders`: Armazena os pedidos de passagens
      - `id` (uuid, chave primária)
      - `user_id` (uuid, referência a users)
      - `trip_id` (uuid, referência a trips)
      - `status` (enum: pending, confirmed, cancelled)
      - `seat_number` (texto)
      - `qr_code` (texto)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `support_tickets`: Armazena tickets de suporte
      - `id` (uuid, chave primária)
      - `user_id` (uuid, referência a users)
      - `subject` (texto)
      - `description` (texto)
      - `status` (enum: open, in_progress, resolved)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas de acesso baseadas em autenticação
*/

-- Criar enum para status dos pedidos
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved');

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  cpf text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de viagens
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origin text NOT NULL,
  destination text NOT NULL,
  departure_date timestamptz NOT NULL,
  arrival_date timestamptz NOT NULL,
  company text NOT NULL,
  price decimal(10,2) NOT NULL,
  available_seats integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  trip_id uuid REFERENCES trips(id) NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  seat_number text NOT NULL,
  qr_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de tickets de suporte
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  subject text NOT NULL,
  description text NOT NULL,
  status ticket_status NOT NULL DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Políticas para trips
CREATE POLICY "Anyone can view trips" ON trips
  FOR SELECT TO authenticated
  USING (true);

-- Políticas para orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Políticas para support_tickets
CREATE POLICY "Users can view own tickets" ON support_tickets
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create tickets" ON support_tickets
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own tickets" ON support_tickets
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());