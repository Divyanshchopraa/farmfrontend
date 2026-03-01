# Farm Care - AI-Powered Content Generation Platform

A TypeScript-based application that leverages Google's Generative AI (Gemini) and vector search capabilities to generate intelligent content with persistent storage and scheduling features.

## Overview

Tempey is a backend service built with Express.js that integrates multiple cutting-edge technologies to provide:
- **AI-Powered Content Generation** using Google's Generative AI API
- **Vector Database Integration** with Pinecone for semantic search and retrieval
- **File Management** capabilities with Multer
- **Scheduled Tasks** with Node Cron for automated operations
- **Firebase Integration** for authentication and data management
- **Type Safety** with TypeScript and Zod validation

## Tech Stack

### Core Framework
- **Express.js** (v5.2.1) - Web server framework
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment

### AI & Vector Search
- **@genkit-ai/googleai** (v1.28.0) - Google Genkit integration
- **@google/generative-ai** (v0.24.1) - Google Gemini API client
- **@pinecone-database/pinecone** (v7.0.0) - Vector database for semantic search

### Storage & Authentication
- **Firebase Admin** (v13.6.1) - Backend authentication and database
- **Multer** (v2.0.2) - File upload handling

### Utilities
- **dotenv** (v17.3.1) - Environment variable management
- **node-cron** (v4.2.1) - Task scheduling
- **zod** (v4.3.6) - Runtime type validation
- **cors** (v2.8.6) - Cross-Origin Resource Sharing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- API Keys for:
  - Google Gemini AI
  - Pinecone Vector Database
  - Firebase Service Account credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aryanlmfaoo/hack-krmu.git
cd hack-krmu
```

PPT: https://docs.google.com/presentation/d/1JwMJzwui2jaqmZeRHtGZRbWGMoEYOAyY/edit?usp=sharing&ouid=117041370295944362222&rtpof=true&sd=true
