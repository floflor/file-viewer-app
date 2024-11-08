# File Viewer Application

This is a file viewer application that simulates a file management system with various functionalities.

## Technologies Used

- NextJS: 15.0.2
- Lucide-react: latest version
- Moment: latest version
- React Query: latest version
- Jest: latest version
- Tailwind CSS: latest version

## Functionalities

- **File Structure Visualization**: The application provides a visual representation of the file and folder structure, allowing users to navigate through the hierarchy.
- **Drag and Drop**: Users can drag and drop files and folders to reorganize the file structure.
- **Node Highlighting**: When a node (file or folder) is clicked, the node and all its child nodes are highlighted, providing a visual cue to the user.
- **File Visualization**: When a file is clicked, the application fetches the file details from the IMG.LY API and displays the file's content.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/floflor/file-viewer-app.git
```

2. Change into the project directory:

```bash
cd file-viewer-app
```

3. Create a `.env` file in the project root directory with the following variables:

```
IMGLY_TREE=<endpoint that returns the tree structure>
NEXT_PUBLIC_IMGLY_BASE_DATA_FILE=<endpoint for file visualization, excluding the final '/'>
```

4. Install the dependencies:

```bash
npm install
```

5. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

To build and run the production version:

```bash
npm run build
npm start
```

## Running Tests

To run the tests:

```bash
npm test
```

To run the tests in watch mode:

```bash
npm run test:watch
```

## Commitments and Limitations

- **NextJS Integration**: NextJS was chosen as the framework for this project based on the recommendation from React's official documentation, which states that if you want to build a new app or website fully with React, using a React-powered framework like NextJS is the recommended approach. [React Documentation](https://react.dev/learn/start-a-new-react-project)

- **Responsive UI**: I preferred to focus on the correct functionality and architecture of the application. However, this functionality can be easily extended to improve the responsiveness and ensure the application displays correctly on smaller screens.
