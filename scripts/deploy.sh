#!/bin/bash

# AutoFacturas Deployment Script
# This script builds and deploys the complete AutoFacturas system

set -e  # Exit on error

echo "🚀 AutoFacturas Deployment Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

print_success "Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_success "npm $(npm --version) detected"

# Step 1: Install root dependencies
print_info "Step 1/6: Installing root dependencies..."
npm install
print_success "Root dependencies installed"

# Step 2: Install backend dependencies
print_info "Step 2/6: Installing backend dependencies..."
cd backend
npm install --production
cd ..
print_success "Backend dependencies installed"

# Step 3: Build frontend
print_info "Step 3/6: Building frontend application..."
cd frontend
npm install
npm run build
cd ..
print_success "Frontend built successfully"

# Step 4: Build landing page
print_info "Step 4/6: Building landing page..."
cd landing
npm install
npm run build
cd ..
print_success "Landing page built successfully"

# Step 5: Initialize database
print_info "Step 5/6: Initializing database..."
cd backend
if [ -f "scripts/init-database.js" ]; then
    node scripts/init-database.js
    print_success "Main database initialized"
fi
if [ -f "scripts/init-landing-db.js" ]; then
    node scripts/init-landing-db.js
    print_success "Landing database initialized"
fi
cd ..

# Step 6: Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_info "Step 6/6: Creating .env file from template..."
    cp .env.example .env
    print_success ".env file created (please configure it before starting)"
else
    print_info "Step 6/6: .env file already exists"
fi

echo ""
echo "=================================="
print_success "Deployment completed successfully!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Configure your .env file with production settings"
echo "2. Start the production server with: npm run prod:serve"
echo "   Or start services individually:"
echo "   - Backend:  npm run prod:backend"
echo "   - Frontend: Serve the frontend/build directory"
echo "   - Landing:  Serve the landing/build directory"
echo ""
echo "For development mode:"
echo "   - Backend:  npm run dev:backend"
echo "   - Frontend: npm run dev:frontend"
echo "   - Landing:  npm run dev:landing"
echo ""
