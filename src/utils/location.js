import { defaultCoordinates } from "./constants";

// Resolves with the user's coordinates, or the default location if the
// browser can't provide them. Never rejects, so the weather always loads.
export const getUserCoordinates = () =>
  new Promise((resolve) => {
    if (!("geolocation" in navigator)) {
      resolve(defaultCoordinates);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({ latitude: coords.latitude, longitude: coords.longitude }),
      () => resolve(defaultCoordinates),
      { timeout: 10000, maximumAge: 10 * 60 * 1000 },
    );
  });
