# FIO Dashboard - Sledování plateb

Dashboard pro sledování plateb zákazníků prostřednictvím QR kódů s bankovní integrací.

## Funkce

- 🏦 **Integrace s FIO bankou** - automatický import plateb
- 💳 **Sledování plateb** - kompletní přehled všech transakcí
- 📱 **QR kódy** - generování a správa QR kódů pro platby
- 👥 **Správa zákazníků** - evidence zákazníků a jejich plateb
- ✅ **Review systém** - schvalování plateb zaměstnanci
- 📊 **Dashboard** - přehledné statistiky a reporty

## Technologie

- **Next.js 15** - React framework
- **TypeScript** - typová bezpečnost
- **Prisma** - ORM pro databázi
- **PostgreSQL** - databáze (Neon)
- **Better Auth** - autentifikace
- **Tailwind CSS** - styling
- **Radix UI** - komponenty

## Rychlý start

### 1. Naklonujte projekt
```bash
git clone <repository-url>
cd fio-dashboard
```

### 2. Instalace závislostí
```bash
npm install
```

### 3. Nastavení databáze
1. Vytvořte PostgreSQL databázi (doporučujeme [Neon](https://neon.tech))
2. Zkopírujte `.env.example` do `.env.local`
3. Nastavte `DATABASE_NEON_URL` s vaším connection stringem

### 4. Nastavení autentifikace
```bash
# Vygenerujte náhodný secret
openssl rand -base64 32
```
Nastavte `BETTER_AUTH_SECRET` v `.env.local`

### 5. Inicializace databáze
```bash
# Vygeneruje Prisma client
npm run db:generate

# Synchronizuje schéma s databází
npm run db:push
```

### 6. Spuštění vývoje
```bash
npm run dev
```

Aplikace bude dostupná na [http://localhost:3000](http://localhost:3000)

## Environment Variables

Zkopírujte `.env.example` do `.env.local` a nastavte:

```bash
# Databáze
DATABASE_NEON_URL="postgresql://username:password@host:5432/database"

# Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth (volitelné)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# FIO Bank API
FIO_BANK_TOKEN=""
FIO_ACCOUNT_ID=""
```

## Databázové operace

```bash
# Vygeneruje Prisma client po změnách schématu
npm run db:generate

# Synchronizuje schéma s databází (development)
npm run db:push

# Vytvoří a aplikuje migraci (production)
npm run db:migrate

# Spustí Prisma Studio pro správu dat
npm run db:studio
```

## Struktura projektu

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard stránky
│   └── login/            # Přihlašovací stránka
├── components/            # React komponenty
│   ├── dashboard/        # Dashboard komponenty
│   └── ui/               # UI komponenty (shadcn/ui)
├── lib/                  # Utility knihovny
│   ├── auth.ts           # Better Auth konfigurace
│   ├── auth-client.ts    # Client-side auth
│   └── utils.ts          # Pomocné funkce
└── generated/            # Generované soubory (Prisma)
```

## Vývoj

1. **Databázové změny**: Upravte `prisma/schema.prisma` a spusťte `npm run db:push`
2. **Nové komponenty**: Používejte shadcn/ui komponenty z `src/components/ui/`
3. **API routes**: Vytvářejte v `src/app/api/`
4. **Stránky**: Používejte App Router v `src/app/`

## Produkce

1. Nastavte produkční environment variables
2. Vytvořte migraci: `npm run db:migrate`
3. Buildněte aplikaci: `npm run build`
4. Spusťte: `npm start`

## Podpora

Pro otázky nebo problémy vytvořte issue v tomto repository.