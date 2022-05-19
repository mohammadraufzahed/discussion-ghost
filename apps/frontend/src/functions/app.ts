import initializeProfile from "./initializeProfile";

async function app() {
  // Initilize a fake profile for the user
  await initializeProfile();
}

export default app;
