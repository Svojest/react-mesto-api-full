import React from 'react';
import fail from '../images/Failed.svg';
import success from '../images/Successfully.svg';

export default function InfoTooltip({ name, isOpen, onClose, isSuccess }) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container-tooltip">
                <img
                    className="popup__image-status"
                    alt={isSuccess ? 'Успех ' : 'Неудача'}
                    src={isSuccess ? success : fail}
                />
                <h2 className="popup__title">
                    {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
                </h2>
                <button
                    type="reset"
                    className="popup__button popup__button_type_close"
                    aria-label="reset"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}
