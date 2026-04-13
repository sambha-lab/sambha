#!/bin/bash

set -e

echo "Setting up Sambha development environment..."

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

check_requirements() {
    echo "Checking requirements..."

    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi

    if ! command -v pnpm &> /dev/null; then
        print_warning "pnpm is not installed. Installing pnpm..."
        npm install -g pnpm@9.0.0
    fi

    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. Some features may not work."
    fi

    if ! command -v cargo &> /dev/null; then
        print_error "Rust is required for Soroban contracts. Install rustup first."
        exit 1
    fi

    if ! command -v stellar &> /dev/null; then
        print_error "Stellar CLI is required for Soroban contracts."
        exit 1
    fi

    print_status "Requirements check completed"
}

setup_env_files() {
    echo "Setting up environment files..."

    if [ ! -f .env ]; then
        cat > .env << EOF
# Sambha Development Environment
NODE_ENV=development
DATABASE_URL=mongodb://admin:sambha123@localhost:27017/sambha?authSource=admin
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret-key-change-in-production
ENCRYPTION_KEY=your-32-character-encryption-key-here
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
EOF
        print_status "Created root .env file"
    fi

    if [ ! -f apps/backend/.env.local ]; then
        cat > apps/backend/.env.local << EOF
# Backend Environment
PORT=3001
CORS_ORIGIN=http://localhost:3000,http://localhost:3002
MONGODB_URI=mongodb://admin:sambha123@localhost:27017/sambha?authSource=admin
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d
UPLOAD_MAX_SIZE=10MB
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
EOF
        print_status "Created backend .env.local file"
    fi

    if [ ! -f apps/web/.env.local ]; then
        cat > apps/web/.env.local << EOF
# Web App Environment
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_STELLAR_NETWORK=testnet
EOF
        print_status "Created web app .env.local file"
    fi

    if [ ! -f apps/landing/.env.local ]; then
        cat > apps/landing/.env.local << EOF
# Landing Page Environment
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
EOF
        print_status "Created landing page .env.local file"
    fi

    if [ ! -f apps/mobile/.env ]; then
        cat > apps/mobile/.env << EOF
# Mobile App Environment
API_URL=http://localhost:3001
ENVIRONMENT=development
STELLAR_NETWORK=testnet
EOF
        print_status "Created mobile app .env file"
    fi
}

install_dependencies() {
    echo "Installing dependencies..."
    pnpm install
    print_status "Installed root dependencies"

    pnpm run build --filter="./packages/*"
    print_status "Built shared packages"
}

setup_contracts() {
    echo "Building Soroban contracts..."
    pnpm run build:contracts
    print_status "Built Soroban contract"

    pnpm run test:contracts
    print_status "Contract tests passed"
}

start_services() {
    echo "Starting development services..."

    if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
        docker-compose up -d mongodb redis
        print_status "Started infrastructure services (MongoDB, Redis)"
        print_info "Waiting for services to be ready..."
        sleep 5
    else
        print_warning "Docker not available. Please start MongoDB and Redis manually."
    fi
}

create_scripts() {
    echo "Creating helper scripts..."

    cat > scripts/dev.sh << 'EOF'
#!/bin/bash
echo "Starting Sambha development environment..."
docker-compose up -d mongodb redis
sleep 5
pnpm run dev --parallel
EOF
    chmod +x scripts/dev.sh

    cat > scripts/test-all.sh << 'EOF'
#!/bin/bash
echo "Running all tests..."
pnpm run test:contracts
pnpm run test
echo "All tests completed."
EOF
    chmod +x scripts/test-all.sh

    cat > scripts/build-all.sh << 'EOF'
#!/bin/bash
echo "Building all components..."
pnpm run build:contracts
pnpm run build
echo "All builds completed."
EOF
    chmod +x scripts/build-all.sh

    print_status "Created helper scripts"
}

main() {
    check_requirements
    setup_env_files
    install_dependencies
    setup_contracts
    start_services
    create_scripts

    echo ""
    echo "Setup completed successfully."
    echo "Web App: http://localhost:3000"
    echo "Backend API: http://localhost:3001"
    echo "Landing Page: http://localhost:3002"
    echo "MongoDB: mongodb://localhost:27017"
    echo "Redis: redis://localhost:6379"
}

main "$@"
