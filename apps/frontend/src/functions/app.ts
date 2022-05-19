import setProfile from "./setProfile";

async function app() {
  // Initilize a fake profile for the user
  await setProfile();
}

export default app;
