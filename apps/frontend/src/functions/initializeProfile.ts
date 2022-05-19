import axios from "axios";

async function initializeProfile() {
  if (!localStorage.getItem("profile")) {
    const { data } = await axios.get("https://randomuser.me/api/");
    const { name, picture } = data.results[0];
    const profile = {
      name: `${name.first} ${name.last}`,
      profile: picture.thumbnail,
    };
    localStorage.setItem("profile", JSON.stringify(profile));
  }
}
export default initializeProfile;
