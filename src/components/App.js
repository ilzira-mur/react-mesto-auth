import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false); 
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);


  React.useEffect(()=>{
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, cards]) => {
        setCards(cards);
        setCurrentUser(userInfo)
      }).catch(err => console.log(`${err}`))
  }, [])

  
function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(err => console.log(`${err}`))
}

function handleCardDelete(card) {
    const deleteCards = cards.filter((c) => c._id !== card._id);
    api.deleteCard(card._id)
        .then(() => {
            setCards(deleteCards)
        }).catch(err => console.log(`${err}`))
}

function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(err => console.log(`${err}`))
}

  const handleUpdateUser = (userInfo) => {
    api.setUserInfo(userInfo)
    .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
    })
    .catch(err => console.log(`${err}`))
  }

  const handleUpdateAvatar = (userInfo) => {
    api.changeUserAvatar(userInfo)
    .then((avatar) => {
      setCurrentUser(avatar);
      closeAllPopups();
    })
    .catch(err => console.log(`${err}`))
  }

  const handleEditProfileClick = () => {
      setEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
      setEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
      setAddPlacePopupOpen(true);
  };  

  const closeAllPopups = () => {
      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setDeleteCardPopupOpen(false);
      setSelectedCard({});
  };

 
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main onEditProfile={handleEditProfileClick} 
            onEditAvatar={handleEditAvatarClick} 
            onAddPlace={handleAddPlaceClick}  
            onCardClick={setSelectedCard}
            handleCardDelete={handleCardDelete}
            handleCardLike={handleCardLike}
            cards={cards} />
      <Footer/>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <PopupWithForm title={'Вы уверены?'} name={'delete-card'} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups}>
            <button type="submit" className="popup__button popup__button_type_save popup__button_type_small">Да</button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;