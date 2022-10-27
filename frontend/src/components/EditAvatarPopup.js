import useFormAndValidation from 'hooks/useFormAndValidation';
import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
    const { handleChange, isErrors, isValid, resetForm } = useFormAndValidation();

    const avatarRef = useRef();

    useEffect(() => {
        resetForm('');
    }, [isOpen, resetForm]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="form-edit-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
            isDisabled={Object.values(isErrors).some((item) => item)}
        >
            <fieldset className="popup__input-container">
                <input
                    ref={avatarRef}
                    type="url"
                    className="popup__input popup__input_type_avatar-url"
                    id="avatar-url"
                    placeholder="Ссылка на картинку"
                    name="avatar-url"
                    required={true}
                    onChange={handleChange}
                />
                <span className={`popup__input-error form-name-error ${isValid ? '' : 'popup__input-error_active'}`}>
                    {isErrors['avatar-url']}
                </span>
            </fieldset>
        </PopupWithForm>
    );
}
