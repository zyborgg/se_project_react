// Used when the browser can't share the user's location
// (permission denied, unsupported browser, or timeout).
export const defaultCoordinates = {
  latitude: 33.13036,
  longitude: -117.085358,
};

// Logged-out visitors see only this user's items (the site owner's
// wardrobe). If unset, logged-out visitors see every item.
export const showcaseOwnerId = import.meta.env.VITE_SHOWCASE_OWNER_ID || "";

export const apiKey ="7b91b37495f6d1e1992eddad7d0372b8";
