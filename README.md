# Electric games

## Description

This project is a dynamic website featuring a collection of pages that include a homepage, games and characters showcases, and a custom-made Hangman game. Developed with an emphasis on universal design, the website ensures accessibility and ease of use across various devices and screen sizes. The frontend interacts with a .NET backend via Axios to manage data stored in MongoDB, providing a seamless experience for managing game and character information.

## Features

-**Homepage**: Serves as the landing page with quick navigation to other sections of the website.

-**Games Page**: Displays a grid of cards, each representing a game with an image and information. Users can add, edit, or delete games through a modal interface.

-**Characters Page**: Similar to the Games page, it showcases characters in a grid layout with options to add, edit, or delete entries.

-**Hangman Game Page**: An extra feature providing an interactive Hangman game that can be played using both mouse clicks and keyboard inputs. The game includes a visual representation created with HTML and CSS, while JavaScript handles the logic.

-**Search Functionality**: Seamlessly search for games and characters using names, platforms, release year, or database IDs through the search box.

## Technology Stack

-**Frontend**: Utilizes media queries for responsive design, adapting content for desktop, tablet, and mobile devices. Axios is used for API communication.
-**Backend**: .NET framework handling API requests and interactions with a cloud-hosted MongoDB for data persistence.
-**Database**: MongoDB hosted in the cloud for storing game and character data.
-**Design**: Focus on universal design principles to ensure accessibility, with carefully selected colors and text sizes.

## Getting Started

### Prerequisites

- Install Node.js and npm to run the frontend.
- Install .NET 6.0 SDK for the backend.

Additionally, you might need to trust the ASP.NET Core HTTPS development certificate if you're running the project for the first time. This certificate ensures that your web browser trusts the locally running web server, allowing you to access your application over HTTPS without security warnings.

To trust the ASP.NET Core HTTPS development certificate, run the following command:

```
dotnet dev-certs https --trust
```

### Installation

1. Clone the repository
2. Navigate to the frontend directory and install dependencies:

   ```
   cd electric-games-react
   npm install
   ```
3. Start the frontend server:

   ```
   npm start
   ```
4. In a separate terminal, navigate to the backend directory and launch the .NET application:

   ```
   cd electric-games-dotnet-api
   dotnet run
   ```
5. Ensure MongoDB is running to handle database operations.

### Configuring Database Connection

This project uses a cloud-hosted MongoDB instance. For security reasons, the connection details are not included in the project files. To run the project locally:

1. Create a `.env` file in the root directory.
2. Contact me to obtain the necessary environment variable details for the database connection.
3. Populate the `.env` file with the provided details, following the format specified in `.env.example`.

This approach ensures the project can be set up and evaluated by authorized users while maintaining the security of the database connection.
