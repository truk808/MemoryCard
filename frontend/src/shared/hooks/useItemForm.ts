import {useEffect, useState} from "react";

export function useItemForm<T>(initialValue: T) {
    const [form, setForm] = useState<T>(initialValue);

    const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetForm = (value?: T) => {
        setForm(value ?? initialValue);
    };

    useEffect(() => {
        setForm(initialValue);
    }, [initialValue]);

    return {
        form,
        handleChange,
        resetForm,
    };
}
