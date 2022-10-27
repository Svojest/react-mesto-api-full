import useFormAndValidation from 'hooks/useFormAndValidation';
import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const { values, handleChange, isErrors, isValid, resetForm } = useFormAndValidation();

    useEffect(() => {
        resetForm('');
    }, [isOpen, resetForm]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        console.log('ho');
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: values['card-name'],
            link: values['card-url'],
        });
    }
    return (
        <PopupWithForm
            name="form-add"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Добавить"
            onSubmit={handleSubmit}
            isDisabled={Object.values(isErrors).some((item) => item)}
        >
            <fieldset className="popup__input-container">
                <input
                    value={values['card-name'] || ''}
                    onChange={handleChange}
                    type="text"
                    className="popup__input popup__input_type_card-title"
                    id="card-name"
                    placeholder="Название"
                    name="card-name"
                    minLength={2}
                    maxLength={30}
                    required={true}
                />
                <span className={`popup__input-error form-name-error ${isValid ? '' : 'popup__input-error_active'}`}>
                    {isErrors['card-name']}
                </span>
                <input
                    value={values['card-url'] || ''}
                    onChange={handleChange}
                    type="url"
                    className="popup__input popup__input_type_card-url"
                    id="card-url"
                    placeholder="Ссылка на картинку"
                    name="card-url"
                    required={true}
                />
                <span className={`popup__input-error form-name-error ${isValid ? '' : 'popup__input-error_active'}`}>
                    {isErrors['card-url']}
                </span>
            </fieldset>
        </PopupWithForm>
    );
}
