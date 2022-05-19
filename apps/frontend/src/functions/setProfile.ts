import Profile from "../types/profile";
import initializeProfile from "./initializeProfile";

async function setProfile(): Promise<void> {
  const strProfile: string | null = localStorage.getItem("profile");
  if (strProfile) {
    const profile: Profile = JSON.parse(strProfile);
    const userProfile: HTMLMediaElement | null = document.querySelector(
      "#user_profile > img"
    );
    if (userProfile) {
      userProfile.src = profile.profile;
    }
  } else {
    await initializeProfile();
    setProfile();
  }
}

export default setProfile;
