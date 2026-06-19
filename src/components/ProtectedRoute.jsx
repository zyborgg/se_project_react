// import blank from "react-router-dom";

export default function ProtectedRoute({ signIn, onSubmit }) {
  if (user === isSignedIn) {
    // route to profile
  } else {
    // route to sign in
  }
  return (
    <Navigation>
      <Profile />
    </Navigation>
  );
}
