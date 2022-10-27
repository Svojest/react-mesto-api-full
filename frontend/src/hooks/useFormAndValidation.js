import { useCallback, useState } from 'react';

export default function useFormAndValidation() {
    const [values, setValues] = useState({});

    const [isErrors, setIsErrors] = useState({});

    const [isValid, setIsValid] = useState(true);

    const handleChange = (e) => {
        const { value, name } = e.target;

        setValues({ ...values, [name]: value });
        setIsErrors({ ...isErrors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest('form').checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newIsErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setIsErrors(newIsErrors);
            setIsValid(newIsValid);
        },
        [setValues, setIsErrors, setIsValid],
    );
    return { values, handleChange, setValues, isErrors, isValid, setIsValid, resetForm };
}
