import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/Sidebar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  handleCardClick,
  onAddClick,
  setActiveModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="profile">
      <Sidebar
        setActiveModal={setActiveModal}
        onSignOut={() => {
          localStorage.removeItem("jwt");
          window.location.reload();
        }}
      />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
      />
    </section>
  );
}
