import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/Sidebar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  handleCardClick,
  onAddClick,
  onCardLike,
  handleCardLike,
  setActiveModal,
  isLoggedIn,
  handleSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="profile">
      <Sidebar setActiveModal={setActiveModal} onSignOut={handleSignOut} />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </section>
  );
}
