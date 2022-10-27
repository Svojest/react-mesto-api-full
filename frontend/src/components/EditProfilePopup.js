import { CurrentUserContext } from 'context/CurrentUserContext';
import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import useFormAndValidation from 'hooks/useFormAndValidation';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const { values, handleChange, setValues, isErrors, isValid, resetForm } = useFormAndValidation();

    useEffect(() => {
        if (isOpen) {
            setValues({ 'profile-name': currentUser.name, 'profile-about': currentUser.about });
        } else resetForm('');
    }, [currentUser, isOpen, resetForm, setValues]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        console.log('ho');
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: values['profile-name'],
            about: values['profile-about'],
        });
    }

    return (
        <PopupWithForm
            name="form-edit"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isDisabled={Object.values(isErrors).some((item) => item)}
        >
            <fieldset className="popup__input-container">
                <input
                    value={values['profile-name'] || ''}
                    onChange={handleChange}
                    type="text"
                    className="popup__input popup__input_type_name"
                    id="profile-name"
                    placeholder="Имя"
                    name="profile-name"
                    minLength={2}
                    maxLength={40}
                    required={true}
                />
                <span className={`popup__input-error form-name-error ${isValid ? '' : 'popup__input-error_active'}`}>
                    {isErrors['profile-name']}
                </span>
                <input
                    value={values['profile-about'] || ''}
                    onChange={handleChange}
                    type="text"
                    className="popup__input popup__input_type_about"
                    id="profile-about"
                    placeholder="О себе"
                    name="profile-about"
                    minLength={2}
                    maxLength={200}
                    required={true}
                />
                <span className={`popup__input-error form-name-error ${isValid ? '' : 'popup__input-error_active'}`}>
                    {isErrors['profile-about']}
                </span>
            </fieldset>
        </PopupWithForm>
    );
}

// isErrors['profile-name']
// isErrors['profile-about']
