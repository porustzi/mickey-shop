
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  category TEXT NOT NULL CHECK (category IN ('streetwear', 'sneakers', 'jackets', 'accessories', 'vintage')),
  condition TEXT NOT NULL CHECK (condition IN ('new', 'like_new', 'good', 'fair')),
  size TEXT,
  brand TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 1,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  seller_name TEXT,
  seller_telegram TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_products" ON products FOR SELECT
  TO anon, authenticated USING (is_active = true);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  nova_poshta_branch TEXT NOT NULL,
  comment TEXT,
  items JSONB NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 80,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "select_own_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

-- Seed mock products
INSERT INTO products (name, description, price, original_price, category, condition, size, brand, images, is_featured, seller_name, seller_telegram) VALUES
(
  'Arc''teryx Beta Jacket',
  'Technical shell jacket in graphite colorway. Waterproof GORE-TEX fabric, minimal branding. Perfect for urban exploration.',
  8500, 15000, 'jackets', 'like_new', 'M', 'Arc''teryx',
  ARRAY['https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800'],
  true, 'VOID_STORE', '@void_store'
),
(
  'Nike Air Force 1 Triple Black',
  'Clean all-black colorway. Leather upper, Air cushioning. Worn twice, pristine condition.',
  3200, 4500, 'sneakers', 'like_new', '42', 'Nike',
  ARRAY['https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'],
  true, 'VOID_STORE', '@void_store'
),
(
  'Vintage 90s Bomber Jacket',
  'Rare vintage military bomber with embroidered patches. Distressed in all the right ways.',
  4200, NULL, 'vintage', 'good', 'L', 'Vintage',
  ARRAY['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'],
  true, 'ARCHIVE_UA', '@archive_ua'
),
(
  'Balenciaga Speed Trainer',
  'Iconic sock sneaker silhouette. Black knit upper with triple sole stack. Very light wear.',
  9800, 18000, 'sneakers', 'like_new', '41', 'Balenciaga',
  ARRAY['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'],
  true, 'LUXE_SECOND', '@luxe_second'
),
(
  'Carhartt WIP Hoodie Black',
  'Heavy cotton fleece hoodie in black. Clean logo embroidery. Classic oversized silhouette.',
  2800, NULL, 'streetwear', 'good', 'XL', 'Carhartt WIP',
  ARRAY['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false, 'VOID_STORE', '@void_store'
),
(
  'Porter-Yoshida Shoulder Bag',
  'Japanese craft. Ballistic nylon, clean black colorway. Multiple compartments. Near mint.',
  5500, 9000, 'accessories', 'like_new', 'OS', 'Porter-Yoshida',
  ARRAY['https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false, 'ARCHIVE_UA', '@archive_ua'
),
(
  'Stone Island Sweatshirt',
  'Iconic compass badge. Garment dyed cotton fleece in slate grey. Clean, minimal streetwear.',
  6200, 10500, 'streetwear', 'like_new', 'L', 'Stone Island',
  ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false, 'LUXE_SECOND', '@luxe_second'
),
(
  'New Balance 990v5 Grey',
  'Made in USA. Classic grey suede/mesh upper. The original dad shoe done right.',
  5800, 8500, 'sneakers', 'good', '43', 'New Balance',
  ARRAY['https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false, 'VOID_STORE', '@void_store'
),
(
  'Levi''s 501 Vintage Selvedge',
  'Japan market vintage reissue. Dark indigo selvedge denim. Single wash, minimal fade.',
  3500, NULL, 'vintage', 'good', '30/32', 'Levi''s',
  ARRAY['https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false, 'ARCHIVE_UA', '@archive_ua'
),
(
  'Acronym J1A-GT Jacket',
  'GORE-TEX shell with signature Acronym minimalism. Gravity pockets, articulated patterning.',
  42000, 65000, 'jackets', 'like_new', 'S', 'Acronym',
  ARRAY['https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800'],
  true, 'VOID_STORE', '@void_store'
),
(
  'Maison Margiela Tabi Boots',
  'Iconic split-toe silhouette. Black leather, stacked heel. Rare archive find.',
  12500, 22000, 'accessories', 'like_new', '39', 'Maison Margiela',
  ARRAY['https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false, 'LUXE_SECOND', '@luxe_second'
),
(
  'Supreme Box Logo Tee',
  'Classic brick colorway. Box logo on white. Deadstock condition, never worn.',
  4500, NULL, 'streetwear', 'new', 'M', 'Supreme',
  ARRAY['https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false, 'ARCHIVE_UA', '@archive_ua'
);
