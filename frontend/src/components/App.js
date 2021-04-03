import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopupOpen from './DeleteCardPopupOpen.js';
import ImagePopup from './ImagePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import auth from '../utils/auth.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrenUserContext.js';
import { CardContext } from '../contexts/CardContext.js';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import '../index.css';

function App () {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''}); //

  const [cardToDelete, setCardToDelete] = React.useState({})

  const [tooltip, setTooltip] = React.useState({
    isOpen: false,
    success: true
  });

  const [loggedIn, setLoggedIn] = React.useState(false); //
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if(!token) {
        return console.log('Нет jwt токена');
    } else {
        api.setHeaders(token);

        Promise.all([api.getCards(), api.getUser()])
            .then(([cardsData, userData]) => {
                setCards(cardsData);
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }
  }, [loggedIn]);

  const handleRegister = (email, password) => {
    auth.register(email, password)
        .then(() => {
                setLoggedIn(true);
                setTooltip({isOpened: true, success: true});
                history.push("/signin");
        })
        .catch((err) => {
          setTooltip({isOpened: true, success: false});
            if (err === "Error 400") {
                return console.log("Неверно заполнили поле");
            }
            if (err === "Error 409") {
                return console.log("Пользователь существует");
            }
            console.log(err)
        });
  };

  const handleLogin = (email, password) => {
    auth.login(email, password)
        .then((res) => {
                localStorage.setItem("jwt", res.token);
                setLoggedIn(true);
                setEmail(email);
                history.push("/");
        })
        .catch((err) => {
            if (err === "Error 400") {
                return console.log("Неверно заполнили поле");
            }
            if (err === "Error 401") {
                return console.log("Неправильные почта/пароль");
            }
            console.log(err);
        });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  };

const tokenCheck = () => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    auth.checkToken(jwt)
      .then((res) => {
        res ? setLoggedIn(true) : setLoggedIn(false); //
        setEmail(res.email);
        history.push('/');
      })
      .catch(err => console.log(err));
    }
  };

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id); //
    
    api.likesChanges(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        }).catch((err)=>{
          console.log(err)
        });
  }

  function handleCardDelete(card) { //
      const isOwner = card.owner._id === currentUser._id; //
      
      api.deleteCard(card._id, isOwner)
          .then((deletedCard) => {
            setCards(cards.filter(c => c._id !== card._id, console.log(deletedCard)))
            closeAllPopups()
          }).catch((err)=>{
            console.log(err)
          });
  }

  const handleEditAvatarClick = () => { 
    setIsEditAvatarPopupOpen(true) //
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true) //
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true) //
  }

  const handleDeletePlaceClick = (card) => {
    setCardToDelete(card)
    setIsDeleteCardPopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleUpdateUser = (data) => {
    api.editProfile(data)
    .then((data)=>{
      setCurrentUser(data)
    }).catch((err)=>{
      console.log(err)
    }).finally(() => {
      closeAllPopups()
    })
  }

  const handeUpdateAvatar = (data) => {
    api.changeUserPic(data)
    .then((data)=>{
      setCurrentUser(data)
    }).catch((err)=>{
      console.log(err)
    }).finally(() => {
      closeAllPopups()
    })
  }

  const handleAddPlaceSubmit = (data) => {
    api.addCard(data)
    .then((newCard)=>{
      setCards([newCard, ...cards])
    }).catch((err)=>{
      console.log(err)
    }).finally(() => {
      closeAllPopups()
    })
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false) //
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setSelectedCard({name: '', link: ''})
    setTooltip({
      ...tooltip,
      isOpen: false
    });
  }

  return (
      <>
        <CurrentUserContext.Provider value={ currentUser }>
          <CardContext.Provider value={ cards }>
            <Header email={ email } handleLogout={ handleLogout }/>
			<Switch>
				<Route path="/signin">
					<Login handleLogin={ handleLogin } />
				</Route>
				<Route path='/signup'>
					<Register handleRegister={ handleRegister } />
				</Route>
				<ProtectedRoute exact path='/'
					component={ Main }
					loggedIn={ loggedIn }
					onEditProfile={ handleEditProfileClick } 
					onAddPlace={ handleAddPlaceClick }
					onEditAvatar={ handleEditAvatarClick }
					onCardClick={ handleCardClick }
					handleCardLike={ handleCardLike }
					handleCardDelete={ handleDeletePlaceClick } 
					cards = { cards }
				/>
          <Route>
            <Redirect to={`/${ loggedIn ? '' : 'signin'}` } />
          </Route>
			</Switch>
            <Footer />
            <EditProfilePopup isOpened = { isEditProfilePopupOpen } onClose = { closeAllPopups }  onUpdateUser ={ handleUpdateUser }/>
            <AddPlacePopup isOpened = { isAddPlacePopupOpen } onClose = { closeAllPopups } onAddCard = { handleAddPlaceSubmit }/>
            <EditAvatarPopup isOpened = { isEditAvatarPopupOpen } onClose = { closeAllPopups } onUpdateAvatar={ handeUpdateAvatar }/>
            <DeleteCardPopupOpen isOpened = { isDeleteCardPopupOpen } onClose = { closeAllPopups } handleCardDelete={ handleCardDelete } cardToDelete={ cardToDelete }/>
            <ImagePopup namePopup="popup popup-pic" card={ selectedCard } onClose = { closeAllPopups } />
            <InfoTooltip tooltip={ tooltip } onClose={ closeAllPopups } />
          </CardContext.Provider>
        </CurrentUserContext.Provider>
      </>
    );
}
  
export default App;

