# PatternFly Application

A modern React TypeScript application built with PatternFly design system for project management, workload monitoring, and storage configuration.

## Prerequisites

- Node.js (version 16 or higher)
- npm (version 7 or higher)

## Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

Create a production build:

```bash
npm run build
```

The built files will be generated in the `dist` directory.

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## Code Quality

Check code formatting and linting:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # React components organized by functionality
├── pages/              # Main application pages
├── styles/             # CSS styles and design tokens
└── __tests__/          # Test files and test utilities
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint code quality checks |

## Deployment

After building the project:

1. Upload the contents of the `dist` folder to your web server
2. Configure your web server to serve the `index.html` file for all routes (for client-side routing)
3. Ensure your server supports serving static assets (CSS, JS, images)

### Example Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Design System**: PatternFly
- **Build Tool**: Vite
- **Testing**: Jest and React Testing Library
- **Code Quality**: ESLint and TypeScript