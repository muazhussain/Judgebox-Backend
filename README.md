
# JudgeBox Backend

JudgeBox is an online programming contest platform built with NestJS. This backend service handles user management, contest operations, problem management, and submission processing.

## Features

- 👥 User Authentication & Authorization
- 🏆 Contest Management
- 📝 Problem Management
- ⚡ Real-time Submission Status Updates
- 🔒 Role-based Access Control
- 📊 Test Case Management

## Tech Stack

- **Framework**: NestJS
- **Databases**:
  - PostgreSQL (Primary Database)
  - MongoDB (Test Cases Storage)
  - Redis (Queue Management)
- **Authentication**: JWT
- **API Documentation**: Swagger
- **Queue Management**: Bull

## Getting Started

### Prerequisites

- Node.js (>= 22.x)
- PostgreSQL
- MongoDB
- Redis
- Docker (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/judgebox-backend.git
cd judgebox-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/judgebox
MONGODB_URI=mongodb://localhost:27017/judgebox
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h

# Other configurations
PORT=3000
...
```

4. Start the development server:
```bash
npm run start:dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Users
- `GET /users` - Get current user
- `GET /users/all` - Get all users (Admin only)
- `PATCH /users` - Update user
- `DELETE /users` - Delete user

### Problems
- `GET /problems` - Get all problems
- `POST /problems` - Create problem (Admin only)
- `GET /problems/:id` - Get specific problem
- `PATCH /problems/:id` - Update problem (Admin only)
- `DELETE /problems/:id` - Delete problem (Admin only)

### Test Cases
- `GET /test-cases/:problemId` - Get test cases for a particular problem
- `POST /test-cases` - Create test case (Admin only)
- `GET /test-cases/:id` - Get specific test case
- `PATCH /test-cases/:id` - Update test case (Admin only)
- `DELETE /test-cases/:id` - Delete test case (Admin only)

### Contests
- `GET /contests` - Get all contests
- `POST /contests` - Create contest (Admin only)
- `GET /contests/:id` - Get specific contest
- `PATCH /contests/:id` - Update contest (Admin only)
- `DELETE /contests/:id` - Delete contest (Admin only)

### Contest Problems
- `GET /contest-problems` - Get contest problems
- `POST /contest-problems` - Add problem to contest
- `GET /contest-problems/:id` - Get specific contest problem
- `PATCH /contest-problems/:id` - Update contest problem
- `DELETE /contest-problems/:id` - Remove problem from contest

### Contest Registrations
- `GET /contest-registrations` - Get registrations
- `POST /contest-registrations` - Register for contest
- `GET /contest-registrations/:id` - Get specific registration
- `DELETE /contest-registrations/:id` - Cancel registration

### Submissions
- `GET /submissions` - Get submissions
- `POST /submissions` - Create submission
- `GET /submissions/:id` - Get specific submission
- `PATCH /submissions/:id` - Update submission status

## Role-Based Access Control

The system implements two roles:
- **User**: Can participate in contests and submit solutions
- **Admin**: Has full access to manage contests, problems, and test cases

## Deployment

The project uses GitHub Actions for CI/CD. The pipeline:
1. Builds the application
2. Creates Docker image
3. Pushes to Docker Hub
4. Can be deployed to production environment

## Development

### Code Style

The project follows NestJS best practices and conventions:
- Controllers handle HTTP requests and responses
- Services contain business logic
- Guards handle authentication and authorization
- DTOs validate incoming data
- Common response format for consistent API responses

### Error Handling

All endpoints use a common response format:
```typescript
{
  success: boolean;
  message: string;
  data?: any;
  timestamp: Date;
  statusCode: number;
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.