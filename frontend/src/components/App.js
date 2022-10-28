import { CurrentUserContext } from 'context/CurrentUserContext';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
// import { auth } from 'utils/auth';
import { api } from '../utils/api';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState([]);
    const [cards, setCards] = useState([]);

    const [email, setEmail] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const history = useHistory();

    useEffect(() => {
        // Проверяем, есть ли сохраненный токен пользователя
        if (localStorage.getItem('token')) {
          const token = localStorage.getItem('token');
          tokenCheck(token);
        }
      }, []);

      function tokenCheck(jwt) {
        if (jwt) {
          api.getContent(jwt).then((res) => {
            if (res) {
              // Авторизуем пользователя
              setLoggedIn(true);
              // Сохраним нужные данные
              setEmail(res.email);
              // Загрузим информацию для главной страницы
              loadUserData();
              // Перенаправим на главную
              history.push("/");
            }
          })
          .catch((err) => console.log(err));
        }
      }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsTooltipOpen(false);
    }

    function handleUpdateUser(newUserInfo) {
        api.setUserInfo(newUserInfo)
            .then((res) => {
                if (res) {
                    setCurrentUser(res);
                    closeAllPopups();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDeleteCard(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }


    function handleUpdateAvatar(newAvatar) {
        api.setAvatar(newAvatar)
            .then((res) => {
                if (res) {
                    setCurrentUser(res);
                    closeAllPopups();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(newCard) {
        api.addCard(newCard)
            .then((res) => {
                if (res) {
                    setCards([res, ...cards]);
                    closeAllPopups();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleRegister(email, password) {
        api.register(email, password)
            .then((user) => {
                if (user) {
                    setEmail(user.email);
                    setIsSuccess(true);
                    setIsTooltipOpen(true);
                    history.push('/sign-in');
                }
            })
            .catch((err) => {
                console.log(err);
                setIsSuccess(false);
                setIsTooltipOpen(true);
            });
    }

    function handleSignOut() {
        console.log('hi');
        setLoggedIn(false);
        localStorage.removeItem('token');
    }

    function handleLogin(email, password) {
        api.login(email, password)
            .then((res) => {
                if (res.token) {
                    tokenCheck(res.token);
                    setLoggedIn(true);
                    setEmail(email);
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
                setIsSuccess(false);
                setIsTooltipOpen(true);
            });
    }

    function loadUserData() {
        api.getUserInfo()
          .then((resUserInfo) => {
              setCurrentUser(resUserInfo);
            //   console.dir(resUserInfo);
            })
            .catch((err) => console.log(err));
            api.getInitialCards()
            .then((resCards) => {
                setCards(resCards)
                // console.dir(resCards)
        })
        .catch((err) => console.log(err));
    }

      

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        cards={cards}
                        component={Main}
                        email={email}
                        loggedIn={loggedIn}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardDelete={handleDeleteCard}
                        onCardLike={handleCardLike}
                        onSignOut={handleSignOut}
                    ></ProtectedRoute>

                    <Route exact path="/">
                        {loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/sign-up" />}
                    </Route>

                    <Route path="/sign-in">
                        <Header linkText="Регистрация" />
                        <Login onLogin={handleLogin} />
                    </Route>
                    <Route path="/sign-up">
                        <Header linkText="Войти" />
                        <Register onRegister={handleRegister} />
                    </Route>
                </Switch>

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                ></EditProfilePopup>

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                ></AddPlacePopup>

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                ></EditAvatarPopup>

                <InfoTooltip
                    name="tooltip"
                    isOpen={isTooltipOpen}
                    onClose={closeAllPopups}
                    isSuccess={isSuccess}
                ></InfoTooltip>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
