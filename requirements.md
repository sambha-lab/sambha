## **Sambha - Blockchain-Enhanced Event Management Platform: Requirements Document**

Version: 1.1\
Date: May 20, 2025

**1\. Introduction**

This document outlines the requirements for a Blockchain-Enhanced Event
Management Platform. The platform aims to provide a comprehensive solution for
event guests, event planners, and vendors, leveraging blockchain technology for
enhanced security, transparency, and efficiency in event pass management and
vendor payments. The platform will also incorporate AI-driven features to assist
event planners.

**2\. Overall Goals**

- Streamline the event planning and management process.
- Enhance the event guest experience with secure and unique digital passes.
- Provide a secure and transparent system for vendor discovery, booking, and
  milestone-based payments.
- Foster a connected ecosystem for planners, guests, and vendors.
- Ensure platform integrity, data security, and compliance with relevant
  regulations.

**3\. User Roles & Personas**

The platform will cater to the following primary user roles:

- **Event Guests:** Individuals attending events.
- **Event Planners:** Individuals or organizations planning and managing events.
- **Vendors:** Service providers offering services for events (e.g., catering,
  photography).
- **Platform Administrators:** Internal users responsible for overseeing and
  managing the platform.

**4\. Functional Requirements**

**4.1. General Platform Features (Applicable to multiple roles)**

- **User Registration & Authentication:**
  - Users shall be able to register using email/password.
  - Users shall be able to register/log in using OAuth providers (e.g., Google,
    Facebook, Apple).
  - The system shall use JWTs for session management.
- **Profile Management:**
  - Users shall be able to create and update their profiles.
  - Profile information shall include basic details (name, email), bio, and
    profile image.
  - Users shall be able to upload photos to their profile/galleries.
- **Real-time Chat:**
  - The system shall provide real-time in-app chat functionality.
  - Chat features shall include event-specific chat spaces and direct messaging.
  - Users shall be able to mute chat notifications.
  - Users shall be able to report chats or users.
  - Users shall be able to view chat members.
- **Notifications:**
  - The system shall send push notifications and in-app alerts for relevant
    event updates, chat messages, and other platform activities.
  - Users shall be able to customize their notification preferences.
- **Calendar Integration:**
  - Users shall be able to grant the platform access to their calendar services
    (e.g., Google Calendar, Outlook Calendar).
  - The system shall be able to automatically schedule events on users'
    calendars.
- **File Upload & Management:**
  - The system shall allow users to upload files (images, documents).
  - Client-side validation for file types and sizes shall be implemented.
  - Upload progress indicators and error handling shall be provided.

**4.2. Event Guest Features**

- **Event Discovery & RSVP:**
  - Guests shall be able to be invited to events (via email, phone number, or
    invite link).
  - Guests shall be able to RSVP to invited events (accept/decline).
  - Guests shall be able to view a list of their past and upcoming events.
  - Guests shall be able to view detailed information about events they are part
    of.
- **NFT-Based Event Passes:**
  - Guests shall receive a unique, NFT-based digital pass for each event they
    RSVP to.
  - Guests shall be able to view their event passes within the app.
  - Guests shall be able to download their event passes.
  - Event passes may be non-transferable (soulbound) or have admin-controlled
    transferability based on event settings.
- **Event Experience:**
  - Guests shall be able to view their seating arrangement for an event (if
    applicable).
  - Guests shall be able to participate in event-specific chat spaces.

**4.3. Event Planner Features**

- **Event Creation & Management:**
  - Planners shall be able to create new events.
  - Event creation shall include details such as:
    - Event name, description, type.
    - Location.
    - Start and end date/time.
    - Event background image.
    - Budget.
    - Expected guest capacity.
    - Event theme.
  - Planners shall be able to edit their created events.
  - Planners shall be able to view a list of their upcoming and past hosted
    events.
- **Guest Management:**
  - Planners shall be able to invite guests via email, phone number, or by
    generating an invite link.
  - Planners shall be able to manage hosts for an event (assign roles like
    creator, manager, non-manager).
  - Planners shall be able to view guest lists and their RSVP status
    (accepted/declined).
- **Task Management:**
  - The system shall use AI to suggest a list of tasks required for the event
    based on type, budget, etc.
  - Planners shall be able to add, edit, and delete their own tasks.
  - Tasks shall include details such as:
    - Task name, description.
    - Due date.
    - Assigned person.
    - Notes.
    - Milestones (planners can add/remove/update milestones within tasks).
  - Planners shall be able to view task lists (completed and uncompleted).
- **Budget Management & Cost Estimation:**
  - The system shall use AI to provide an estimated cost for tasks and the
    overall event based on the planner's budget and event details.
- **Vendor Management:**
  - Planners shall be able to discover vendors.
  - Planners shall be able to filter vendors by category and location.
  - Planners shall be able to view vendor details: ratings, price, description,
    reviews, service type, name, location, verification status.
  - Planners shall be able to message vendors.
- **Vendor Booking & Offers:**
  - Planners shall be able to book vendors for specific events.
    - Booking process shall load event details (guest count, date).
    - Payment for booking will be initiated (details TBD, likely funding an
      escrow).
  - Planners shall be able to make an offer to a vendor for an event, including
    an offer amount and message.
  - Planners shall be able to chat with vendors regarding offers.
  - Planners shall be able to accept counter-offers from vendors.
  - Planners shall be able to add milestones to bookings (name, amount, due
    date, description).
  - Planners shall be able to review vendors after a booking is completed.
- **Seating Arrangement:**
  - Planners shall be able to create seating arrangements for guests.
- **Chat Management:**
  - Planners shall be able to view all their chats (vendor chats, event chats).
  - Planners shall be able to edit chat details (name, image).
  - Planners shall be able to add/remove members from chats.
  - Planners shall be able to create new chats between members or with the
    platform and invite users.
- **Subscription & Premium Features:**
  - Planners shall be able to subscribe to premium plans.
  - **Free Tier:**
    - Limited number of events per month (e.g., 2).
    - Attendance cap per event (e.g., 200).
  - **Premium Tier:**
    - Unlimited event creation.
    - Higher attendance cap (e.g., 1000).
    - Email campaign tools for guests (e.g., send reminder emails).
    - Access to an analytics dashboard.
  - Planners shall be able to add/manage their payment methods for
    subscriptions.

**4.4. Vendor Features**

- **Account Verification:**
  - Vendors shall be able to verify their accounts by providing proof of
    identity and proof of address.
- **Profile & Service Management:**
  - Vendors shall be able to update their profile (location, category).
  - Vendors shall be able to add service prices and specify if negotiable.
  - Vendors shall be able to add a vendor logo.
- **Booking & Offer Management:**
  - Vendors shall be able to view a list of their bookings, offers, and rejected
    bookings.
  - Vendors shall be able to accept or reject booking requests.
  - Vendors shall be able to view booking details.
  - Vendors shall be able to make counter-offers to planners (with price and
    message).
  - Vendors shall be able to see the status of their counter-offers and when a
    planner accepts.
- **Milestone Payments (On-Chain):**
  - Vendors shall be able to see milestones for each booking.
  - Vendors shall be able to see amounts paid and pending payments for
    milestones.
  - Payments for milestones shall be handled on-chain (Stellar network, likely
    USDC).
- **Communication & Disputes:**
  - Vendors shall be able to message clients (event planners).
  - Vendors shall be able to dispute bookings (details of dispute resolution
    TBD).
- **Reviews & Earnings:**
  - Vendors shall be able to view and respond to reviews from planners.
  - Vendors shall be able to view their earnings and transaction history.
  - Vendors shall be able to view stats (e.g., bookings, events, total earned
    over 24hrs, 7days, 30days).
- **Financial Management:**
  - Vendors shall be able to add payment/withdrawal methods (for off-chain
    earnings if any, and for on/off-ramping crypto earnings).

**4.5. Platform Administrator Features**

- **User Management:**
  - Admins shall be able to view and filter all users (guests, planners,
    vendors).
  - Admins shall be able to create new users.
  - Admins shall be able to ban or suspend user accounts.
- **Event Management:**
  - Admins shall be able to view and filter all events.
- **Vendor Management:**
  - Admins shall be able to view and filter all vendors.
- **Platform Oversight:**
  - Admins shall have a full overview of the platform:
    - Total events, total vendors.
    - Revenue.
    - Recent activities.
  - Admins shall be able to view all payments (fiat and on-chain).
  - Admins shall have access to platform analytics.

**5\. Contract Requirements (Stellar & Soroban)**

- **NFT Event Passes:**
  - Event passes shall be implemented as digital assets on Stellar using
    Soroban smart
    contracts.
  - NFT metadata (event name, date, pass image URI, link to event details) shall
    be stored off-chain (e.g., IPFS), with the URI stored in the Soroban
    contract.
  - The platform shall manage the minting process.
  - The system must allow for configuration of NFT transferability
    (non-transferable or admin-controlled).
  - The system should implement access control mechanisms to manage event pass
    transfers.

- **On-Chain Milestone Payments for Vendors:**
  - Vendor payments for milestones shall be facilitated using stablecoins (e.g.,
    USDC, DAI) on Stellar.
  - Soroban smart contracts shall be used to implement escrow mechanisms for
    milestone payments.
  - Escrow contracts shall lock funds, with release conditioned on planner
    approval or arbitrator decision.
  - Multi-signature logic (e.g., Planner, Vendor, Platform Arbitrator) may be
    implemented within Soroban contracts for fund release.
  - Smart contracts must manage the state of each milestone (Pending, Completed,
    Disputed, Paid).

- **Dispute Resolution (On-Chain Component):**
  - An impartial arbitrator role shall be defined, potentially with authority
    within the smart contract to resolve disputes and trigger fund release.
  - A secure mechanism for relaying off-chain arbitrator decisions to the
    Soroban
    smart contract is required (e.g., verifiable oracle solutions).

- **Wallet Management:**
  - The platform must decide on a custodial vs. non-custodial wallet strategy
    for users. A non-custodial approach is generally preferred for user-held
    assets like NFTs and vendor payouts.
  - If non-custodial, the platform must provide guidance or integrate with
    user-friendly Stellar wallets.
  - Platform-owned wallets (for minting, escrow deployment) must be highly
    secure.

- **On-Ramp/Off-Ramp Solutions:**
  - The platform must facilitate or guide users to on-ramp/off-ramp solutions
    for converting stablecoins on Stellar to/from fiat currencies.
  - Integration with established Layer 2 bridges and fiat on-ramps is required.

- **Transaction Monitoring:**
  - The platform backend shall monitor Stellar for transaction
    confirmations related to payments and NFT minting/transfers.
  - Transaction indexing and status tracking must account for Stellar network
    finality and Soroban execution results.

- **Smart Contract Security:**
  - All custom Soroban smart contracts must undergo thorough security audits.
  - Mitigation strategies for common vulnerabilities (access control flaws,
    reentrancy, etc.) must be implemented.
  - Formal verification of critical contract components should be considered.
  - Secure upgradeability mechanisms for Soroban contracts must be planned.
  - Stellar-specific security considerations must be addressed.

**6\. AI Integration Requirements**

- **AI for Automated Task Generation:**
  - The system shall use AI (e.g., LLMs via API like OpenAI) to generate a
    comprehensive task list for event planners based on event type, budget,
    guest count, duration, etc.
  - Prompt engineering best practices shall be followed to ensure relevant and
    structured output (e.g., JSON format).
  - LangChain or similar frameworks may be used for structured output.

- **AI for Cost Estimation:**
  - The system shall use AI/ML models to assist planners in generating initial
    budget estimates.
  - This may start with rule-based/parametric models and evolve to ML models
    trained on platform data as it accumulates.
  - AI-generated estimates should be presented as suggestions, with planners
    retaining override capability.

- **AI for Vendor Matching and Recommendation:**
  - The system shall use AI to recommend suitable vendors to event planners.
  - Algorithms may include content-based filtering, collaborative filtering, or
    hybrid models.
  - Vendor profiles and event requirements will be key data inputs.
  - Strategies to address the cold-start problem for new planners and vendors
    are needed.
  - Explainability for recommendations should be considered to build user trust.
  - Potential for bias in AI recommendations must be monitored and mitigated.

**7\. Non-Functional Requirements**

- **Technology Stack:**
  - **Backend:** Node.js, Hono framework, TypeScript.
  - **Database:** MongoDB.
  - **Mobile Application:** React Native.
  - **Blockchain:** Stellar network.
  - **Smart Contracts:** Soroban (Rust).
  - **Caching:** Redis (for performance and real-time feature support like chat
    Pub/Sub).
  - **File Storage:**
    - General application files (images, documents): Centralized cloud storage
      (e.g., AWS S3, Google Cloud Storage).
    - NFT Metadata & Assets: Decentralized storage (IPFS) with pinning services.

- **Performance & Scalability:**
  - The system must handle peak loads during popular events or simultaneous
    bookings.
  - Backend services shall be designed for horizontal scalability.
  - Database optimization (indexing, read replicas, potential sharding for
    MongoDB) is required.
  - Efficient list rendering and navigation in the React Native app.
  - Optimized image handling (formats, resizing, caching).
  - Use of Hermes JavaScript engine for React Native.
  - API rate limiting to prevent abuse.

- **Security:**
  - **Authentication & Authorization:** Secure JWT implementation, OAuth 2.0,
    RBAC for multi-role access.
  - **Data Privacy (PII Handling):**
    - Encryption of PII at rest (MongoDB) and in transit (TLS/SSL, WSS).
    - Data minimization principles.
    - Compliance with GDPR, CCPA, especially concerning blockchain's
      immutability (no PII on-chain).
  - **Payment Processing Security:**
    - PCI DSS compliance for fiat payments (achieved by integrating with
      compliant third-party gateways like Stripe).
    - AML/KYC considerations for crypto payments, potentially leveraging
      third-party KYC providers or integrated ramp services.
  - **Blockchain Security:**
    - Secure wallet management
    - Soroban smart contract security audits
    - Vulnerability mitigation
    - Consideration of Stellar-specific security requirements
    - Implementation of proper contract and signer security measures
  - **Mobile App Security:** Secure storage for tokens/keys on device (Keychain,
    Keystore).
- **User Experience (UX) & Interface (UI):**
  - Mobile-first design patterns.
  - Intuitive navigation and responsive layouts.
  - Touch-friendly interactions with appropriate feedback.
  - Adherence to accessibility guidelines (WCAG).
  - Abstraction of blockchain complexities from the end-user.
  - Clear feedback for on-chain actions (which are not instantaneous).
- **Offline Functionality (Mobile):**
  - Prioritize offline access for guests (NFT event pass, essential event
    details).
  - Consider read-only offline access for planners/vendors initially, with
    queued actions for online sync.
  - Use appropriate local storage (e.g., WatermelonDB, Realm, secure storage for
    sensitive items).
  - Implement data synchronization and conflict resolution strategies.
- **Real-time Communication:**
  - Low-latency chat and notifications.
  - Scalable WebSocket infrastructure (e.g., Socket.IO with Redis Pub/Sub for
    horizontal scaling).
  - Chat moderation features (profanity filtering, image moderation \- if
    applicable, user reporting).
- **Monitoring & Analytics:**
  - Application Performance Monitoring (APM) for backend and mobile app.
  - Database monitoring.
  - Centralized log management.
  - Blockchain monitoring (platform accounts, Soroban contracts).
  - Business analytics (user activity, event trends, revenue) via a data
    warehouse and BI tools.
  - Monitoring for AI feature performance and accuracy.
- **Reliability & Availability:**
  - The platform should aim for high availability, especially during critical
    event periods.
  - Robust error handling and fault tolerance.
- **Maintainability:**
  - Well-structured, documented, and testable code.
  - Modular design to facilitate updates and future enhancements.

**8\. Development Roadmap Considerations (High-Level Phases)**

- **Phase 1: Core Platform & Basic Guest Experience (MVP)**
  - Focus: User registration, basic event creation (planner), RSVP & digital
    pass viewing (guest), fiat subscriptions. Simple Soroban-based pass
    issuance initially.
- **Phase 2: Enhanced Planner Tools & Initial Vendor Integration**
  - Focus: Advanced event config, vendor profiles/discovery, basic chat,
    template-based AI task suggestions.
- **Phase 3: Contract-Powered Vendor Payments & Advanced AI**
  - Focus: Soroban escrow contracts for milestone payments, AI cost estimation &
    vendor recommendations.
- **Phase 4: Full Feature Set & Platform Maturity**
  - Focus: Advanced analytics, refined AI, full dispute resolution, seating
    arrangements, calendar sync, comprehensive chat management.

**9\. Open Questions & Considerations**

- Specifics of the dispute resolution process for vendor payments (arbitrator
  selection, evidence submission, etc.).
- Detailed strategy for Stellar wallet creation and management (especially for
  non-crypto-savvy users).
- Handling of network confirmation and contract execution delays in the user experience.
- Stellar transaction fee management and optimization.

This document will be updated as the project progresses and more details are
defined.
