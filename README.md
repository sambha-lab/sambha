# Sambha - Event Management Platform

[![WIP](https://img.shields.io/badge/Status-Work%20In%20Progress-yellow)](https://github.com/your-repo/sambha)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Smart Contracts: Soroban](https://img.shields.io/badge/Smart%20Contracts-Soroban-0f172a)](https://developers.stellar.org/docs/build/smart-contracts/overview)
[![OnlyDust](https://img.shields.io/badge/Contributions-OnlyDust-purple)](https://app.onlydust.com)

## Problem Statement

Event management remains fragmented, inefficient, and often lacks
transparency. Event planners struggle with coordinating multiple vendors,
managing payments, and providing secure access control for attendees. Vendors
face challenges with inconsistent payment schedules and a lack of standardized
booking processes. Attendees often deal with ticket fraud and cumbersome event
access processes.

Sambha addresses these challenges with a unified platform for planning,
payments, guest access, and vendor coordination. The roadmap now assumes the
smart contract layer will be built on Stellar using Soroban.

## Features

- **Digital Event Passes**: Secure, unique passes for event attendees
- **Milestone-Based Vendor Payments**: Transparent payout workflows backed by
  Soroban smart contracts
- **AI-Enhanced Planning Tools**: Automated task generation and budget
  estimation
- **Comprehensive Event Management**: End-to-end tools for planners, guests,
  and vendors
- **Real-time Communication**: Integrated chat and notification system
- **Vendor Marketplace**: Discovery and booking of verified vendors

## Technology Stack

- **Backend**: Node.js, Hono framework, TypeScript
- **Database**: MongoDB
- **Mobile Application**: React Native
- **Smart Contract Network**: Stellar
- **Smart Contracts**: Soroban (Rust)
- **Caching**: Redis
- **File Storage**: Cloud storage and IPFS-compatible metadata storage where
  needed

## Development Roadmap

### Phase 1: Core Platform & Basic Guest Experience

- Repository structure and development environment
- CI/CD pipeline configuration
- Basic API endpoints for event creation and management
- Initial Soroban contract workspace and contract testing
- Guest RSVP and event discovery flows

### Phase 2: Enhanced Planner Tools & Initial Vendor Integration

- Real-time chat functionality
- Vendor profile and discovery system
- Escrow and payout contract design on Soroban
- Stellar wallet integration research

### Phase 3: Contract-Powered Vendor Payments & Advanced AI

- Soroban escrow implementation for milestone payments
- Payment release mechanisms
- Initial dispute resolution flows
- AI-assisted budget estimation and task generation

### Phase 4: Platform Maturity

- Advanced analytics and monitoring
- Contract hardening and operational tooling
- Expanded financial reporting and dispute management
- Stellar transaction monitoring and reporting

## Contributing

We welcome contributions to Sambha. This project uses the OnlyDust platform to
manage contributions and reward contributors.

1. Find an issue on [OnlyDust](https://app.onlydust.com/projects/sambha).
2. Fork and clone the repository.
3. Create a branch for your work.
4. Implement and test your changes.
5. Submit a pull request.

## License

This project is licensed under the GNU General Public License v3.0. See the
[LICENSE](LICENSE) file for details.
