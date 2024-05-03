## Project deployment

This project uses Next.js and is built with pnpm. To get started, you'll need to have Node.js and pnpm installed on your machine.

### Prerequisites

- Node.js: You can download it from [here](https://nodejs.org/).
- pnpm: You can install it globally on your machine by running `npm install -g pnpm` in your terminal.

### Installation

1. Download the code.
2. Navigate to the project directory with `cd <project-name>`.
3. Install the project dependencies with `pnpm install`.

### Environment Variables

This project uses environment variables for configuration. To set them up:

1. Copy the `.env.example` file in the root directory of the project and rename it to `.env`.
2. Fill in the appropriate values for each environment variable in the `.env` file.

### Building the Project

To build the project for production, use the command `pnpm run build`. This will create a `.next` folder in your project directory which includes the built project.

### Starting the Project

After building the project, you can start it in production mode with `pnpm run start`. This will start the Next.js server in production mode.
