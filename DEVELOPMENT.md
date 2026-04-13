# Sambha Development Guide

This document covers local setup for the Sambha monorepo after the move to
Stellar and Soroban.

## Project Structure

```text
sambha/
├── apps/
│   ├── backend/
│   ├── web/
│   ├── mobile/
│   └── landing/
├── contracts/             # Soroban workspace
├── packages/
├── scripts/
└── docker-compose.yml
```

## Prerequisites

- Node.js 18+
- pnpm 9+
- Docker and Docker Compose
- Rust toolchain
- Stellar CLI

## Quick Start

```bash
./scripts/setup-dev.sh
```

This installs dependencies, creates local env files, builds the Soroban
contract, runs contract tests, and starts MongoDB plus Redis.

## Manual Setup

```bash
pnpm install
docker-compose up -d mongodb redis
pnpm run build --filter="./packages/*"
pnpm run build:contracts
pnpm run test:contracts
```

## Common Commands

```bash
pnpm run dev
pnpm run build
pnpm run test
pnpm run lint
pnpm run type-check
pnpm run build:contracts
pnpm run test:contracts
```

## Soroban Contracts

The contract workspace lives in `contracts/`.

```bash
stellar contract build --manifest-path contracts/contracts/sambha_core/Cargo.toml
cargo test --manifest-path contracts/Cargo.toml
cargo fmt --manifest-path contracts/Cargo.toml --all
cargo check --manifest-path contracts/Cargo.toml
```

Example deploy command:

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/sambha_core.wasm \
  --source YOUR_IDENTITY \
  --network testnet
```

## Environment Variables

Root `.env`:

```env
NODE_ENV=development
DATABASE_URL=mongodb://admin:sambha123@localhost:27017/sambha?authSource=admin
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret-key-change-in-production
ENCRYPTION_KEY=your-32-character-encryption-key-here
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

## Docker

```bash
docker-compose up -d mongodb redis
docker-compose logs -f
docker-compose down
```

## Troubleshooting

Contract build issues:

```bash
cargo clean --manifest-path contracts/Cargo.toml
stellar contract build --manifest-path contracts/contracts/sambha_core/Cargo.toml
```

Service startup issues:

```bash
docker-compose down
docker-compose up --build
```
